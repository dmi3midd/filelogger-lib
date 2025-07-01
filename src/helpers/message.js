const now = new Date();
const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
const year = now.getFullYear();
const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
const time = `${date}.${month}.${year} ${hours}:${minutes}:${seconds}`;

function messageTXT(level, prefix, message, payload = null, event = null) {
    const data = `${time}   ${level.padEnd(6, ' ')}${prefix !== null ? '  '+prefix : ''}   ${message}${payload === null  ? '' : '   '+JSON.stringify(payload)}   ${event === null ? '' : event}\n`;
    return data;
}

function messageJSON(level, prefix, message, payload = null, event = null) {
    let data = {
        time: time,
        level: level,
        prefix: prefix,
        message: message,
        payload: payload,
        event: event
    }
    if (prefix === null) delete data.prefix;
    if (payload === null) delete data.payload;
    if (event === null) delete data.event;
    return data;
}

module.exports = {
    messageTXT,
    messageJSON,
}