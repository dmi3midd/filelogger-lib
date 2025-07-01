const path = require('path');

function valid(options) {
    return {
        directory: directory(options.directory),
        file: file(options.file),
        ext: ext(options.ext),
        isConslog: isConslog(options.isConslog)
    }
}

// Directory validation
function directory(directory) {
    if (!directory) {
        let resultDir = __dirname;
        for (let i = 0; i < 2; i++) {
            resultDir = path.dirname(resultDir);
        }
        return resultDir;
    }
    if (typeof directory !== 'string') throw new Error("'directory' validation error");
    return directory;
}

// File validation
function file(file) {
    if (!file) return "fllib-logs";
    if (typeof file !== 'string') throw new Error("'file' validation error");
    return file;
}

// Extension validation
function ext(ext) {
    if (!ext) return 'txt';
    if (ext !== 'txt' && ext !== 'json') throw new Error("Unexpected extension");
    if (typeof ext !== 'string') throw new Error("'ext' validation error");
    return ext;
}

// isConsole validation
function isConslog(isConslog) {
    if (!isConslog) return false;
    if (typeof isConslog !== 'boolean') throw new Error("'isConslog' validation error");
    return isConslog;
}

module.exports = valid;