const path = require('path');
const exist = require('../utils/exist.js');
const createtxt = require('../utils/createtxt.js');
const createjson = require('../utils/createjson.js');
const writetxt = require('../utils/writetxt.js');
const writejson = require('../utils/writejson.js');

async function writelog(pathToFile, data) {
    const ext = path.extname(pathToFile);
    if (!await exist(pathToFile)) {
        if (ext === '.txt') {
            await createtxt(pathToFile);
        }
        if (ext === '.json') {
            await createjson(pathToFile);
        }
    }
    if (ext === '.txt') {
        await writetxt(pathToFile, data);
    }
    if (ext === '.json') {
        await writejson(pathToFile, data);
    }
}

module.exports = writelog;