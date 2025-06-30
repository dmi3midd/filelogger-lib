const path = require('path');
const LogQueue = require('./helpers/LogQueue.js');
const valid = require('./helpers/optionsValidator.js');
const { messageTXT, messageJSON } = require('./helpers/message.js');
const writelog = require('./helpers/writelog.js');

class FileLogger {
    // fields
    #options;
    #pathToFile;
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
            // throw new Error("Level must be a string");
            return;
        }
        if (typeof isEnabled !== 'boolean') {
            // throw new Error("isEnabled must be boolean");
            return;
        }
        this.#levels[level.trim().toUpperCase()] = isEnabled;
    }

    // Method to disable the logger
    disabled() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = false);
    }

    // Method to enable the logger
    enable() {
        Object.keys(this.#levels).forEach(level => this.#levels[level] = true);
    }

    // Methods for logging
    start(message, payload) {
        const data = this.#message('START', this.#prefix, message, payload);
        this.#queue.add(data);
    }
    end(message, payload) {
        const data = this.#message('END', this.#prefix, message, payload);
        this.#queue.add(data);
    }
    info(message, payload) {
        const data = this.#message('INFO', this.#prefix, message, payload);
        this.#queue.add(data);
    }
    warn(message, payload) {
        const data = this.#message('WARN', this.#prefix, message, payload);
        this.#queue.add(data);
    }
    error(message, payload) {
        const data = this.#message('ERROR', this.#prefix, message, payload);
        this.#queue.add(data);
    }
    debug(message, payload) {
        const data = this.#message('DEBUG', this.#prefix, message, payload);
        this.#queue.add(data);
    }
    event(message, payload = null, event = null) {
        const data = this.#message('EVENT', this.#prefix, message, payload, event);
        this.#queue.add(data);
    }
}

module.exports = FileLogger;