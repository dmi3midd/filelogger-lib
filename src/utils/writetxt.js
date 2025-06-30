const fsPromises = require('fs/promises');

async function write(path, data) {
    try {
        await fsPromises.appendFile(path, data);
    } catch (error) {
        throw new Error(`The file wasn't appended: ${error.message}`);
    }
}

module.exports = write;