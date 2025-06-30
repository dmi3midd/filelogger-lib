const fsPromises = require('fs/promises');

async function exist(path) {
    try {
        await fsPromises.access(path);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = exist;