const fsPromises = require('fs/promises');

async function write(path, data) {
    try {
        const logs = await fsPromises.readFile(path);
        let parsed = JSON.parse(logs).logs;
        parsed.push(data);
        await fsPromises.writeFile(path, JSON.stringify({logs: parsed}, null, 2));
    } catch (error) {
        throw new Error(`The file wasn't appended: ${error.message}`);
    }
}

module.exports = write;