const fsPromises = require('fs/promises');

async function create(path) {
    try {
        await fsPromises.writeFile(path, "");
    } catch (error) {
        throw new Error(`The file wasn't created: ${error.message}`);
    }
}

module.exports = create;