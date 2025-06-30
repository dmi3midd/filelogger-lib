class LogQueue {
    #queue = [];
    #processing = false;

    constructor(logfunc) {
        this.logfunc = logfunc;
    }

    add(data) {
        this.#queue.push(data);
        this.#process();
    }

    async #process() {
        if (this.#processing) return;
        this.#processing = true;
        while (this.#queue.length > 0) {
            const data = this.#queue.shift();
            try {
                await this.logfunc(data);
            } catch (err) {
                throw new Error(err.message);
            }
        }
        this.#processing = false;
    }
}

module.exports = LogQueue;