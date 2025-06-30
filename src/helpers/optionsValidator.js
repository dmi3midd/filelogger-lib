const path = require('path');

function valid(options) {
    return {
        directory: directory(options.directory),
        file: file(options.file),
        ext: ext(options.ext),
    }
}

function directory(directory) {
    if (!directory) {
        let resultDir = __dirname;
        for (let i = 0; i < 2; i++) {
            resultDir = path.dirname(resultDir);
        }
        return resultDir;
    }
    if (typeof directory !== 'string') throw new Error("Directory validation error");
    return directory;
}

function file(file) {
    if (!file) return "fllib_logs";
    if (typeof file !== 'string') throw new Error("File validation error");
    return file;
}

function ext(ext) {
    if (!ext) return 'txt';
    if (ext !== 'txt' && ext !== 'json') throw new Error("Unexpected extension");
    if (typeof ext !== 'string') throw new Error("Ext validation error");
    return ext;
}

module.exports = valid;