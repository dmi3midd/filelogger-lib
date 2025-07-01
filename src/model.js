const path = require('path');
const LogQueue = require('./helpers/LogQueue.js');
const valid = require('./helpers/optionsValidator.js');
const { messageTXT, messageJSON } = require('./helpers/message.js');
const writelog = require('./helpers/writelog.js');

class FileLogger {
    // fields
    #options;
    #pathToFile;
    #isConslog;
    #queue;
    #prefix = null;
    #levels = {
        'START': true,
        'END': true,
        'INFO': true,
        'WARN': true,
        'ERROR': true,
        'DEBUG': true,
        'EVENT': true,
    }

    // methods
    #message;
    #valid = valid;
    #writelog = writelog;

    constructor(options) {
        this.#options = this.#valid(options);
        this.#pathToFile = path.join(this.#options.directory, this.#options.file+'.'+this.#options.ext);
        this.#isConslog = this.#options.isConslog;
        this.#message = this.#options.ext === 'txt' ? messageTXT : messageJSON;
        this.#queue = new LogQueue((data) => this.#writelog(this.#pathToFile, data));
    }

    // Method to set prefix on log
    setPrefix(prefix) {
        if (typeof prefix !== 'string' && prefix !== null) {
            // throw new Error("Prefix must be a string or null");
            return;
        }
        if (prefix.trim() === '') {
            // throw new Error("Prefix cannot be empty");
            return;
        }
        this.#prefix = prefix;
    }

    // Method to disahble or enable the level
    setLevel(level, isEnabled) {
        if (typeof level !== 'string') {
            // throw new Error("'level' must be a string");
            return;
        }
        if (typeof isEnabled !== 'boolean') {
            // throw new Error("'isEnabled' must be boolean");
            return;
        }
        if (!this.#levels.hasOwnProperty(level.trim().toUpperCase())) {
            // throw new Error("The level doesn't exist");
            return;
        }
        this.#levels[level.trim().toUpperCase()] = isEnabled;
    }

    // Method to disable the logger
    disable() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = false);
    }

    // Method to enable the logger
    enable() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = true);
    }

    // Methods for logging
    async start(message, payload) {
        if (!this.#levels['START']) return;
        const data = this.#message('START', this.#prefix, message, payload);
        if (this.#isConslog) console.log(data);
        await this.#queue.add(data);
    }
    async end(message, payload) {
        if (!this.#levels['END']) return;
        const data = this.#message('END', this.#prefix, message, payload);
        if (this.#isConslog) console.log(data);
        await this.#queue.add(data);
    }
    async info(message, payload) {
        if (!this.#levels['INFO']) return;
        const data = this.#message('INFO', this.#prefix, message, payload);
        if (this.#isConslog) console.log(data);
        await this.#queue.add(data);
    }
    async warn(message, payload) {
        if (!this.#levels['WARN']) return;
        const data = this.#message('WARN', this.#prefix, message, payload);
        if (this.#isConslog) console.log(data);
        await this.#queue.add(data);
    }
    async error(message, payload) {
        if (!this.#levels['ERROR']) return;
        const data = this.#message('ERROR', this.#prefix, message, payload);
        if (this.#isConslog) console.log(data);
        await this.#queue.add(data);
    }
    async debug(message, payload) {
        if (!this.#levels['START']) return;
        const data = this.#message('DEBUG', this.#prefix, message, payload);
        if (this.#isConslog) console.log(data);
        await this.#queue.add(data);
    }
    async event(message, event, payload = null) {
        if (!this.#levels['EVENT']) return;
        const data = this.#message('EVENT', this.#prefix, message, payload, event);
        if (this.#isConslog) console.log(data);
        await this.#queue.add(data);
    }
}

module.exports = FileLogger;