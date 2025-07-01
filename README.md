# filelogger-lib
A good solution for logging. Supports logging to ```.txt```, ```.json```, and console outputs.


## Get started
```
npm i filelogger-lib
```  
```js
const Logger = require('filelogger-lib');
const logger = new Logger(options);
```
Options must contain:   

```direcroty``` - path to directory where you would like to create file for logs;  

```file``` - name for the logs file;  

```ext``` - extensoin for the logs file(```txt``` or ```json```);  

```isConslog``` - setting this to ```true``` enables console output for logs;

```js
const options = {
  directory: 'your path to the directory',
  file: 'name of the file',
  ext: 'json',
  isConslog: true
}
```

If you don't provide any configuration to the logger, then by default options will be used:  
```js
const options = {
  directory: 'current directory for the node_modules',
  file: 'fllib-logs',
  ext: 'txt',
  isConslog: true
}
```


## Usage
General log method has 2 args: ```messsage``` and ```payload```(by default - ```null```)  
```js
logger.start("log message", {data: 1});
// The event() function takes an event argument
logger.event("log message", "some event", {data: 2});
```
Output for ```txt```:  

```[time] [level] [?prefix] [message] [?payload] [event]```  

Output for ```json```:  

```js
let data = {
  time: time,
  level: level,
  ?prefix: prefix,
  message: message,
  ?payload: payload,
  event: event
}
```

You can set prefix for logs(by default - ```null```):
```js
logger.setPrefix('prefix');
logger.setPrefix(null); // To reset prefix
```
You can set the levels that are available for use(by default, all levels are enabled):
```js
logger.setLevel(level, isEnabled);
// Example
logger.info("info msg", false);
```
You can disable or enable logger:
```js
logger.disable(); 
logger.enable();
```


## Features with async/await
You can use logging methods with ```await``` inside ```async``` functions. In both cases, the logs will be written in the same order. The difference is when the logging actually happens. If console output is enabled, logs will appear in the console at the exact moment you call the logging method, because console output is synchronous and comes before writing to the file.  

Below are two examples demonstrating the difference.


## Examples
### Sync
```js
function f1() {
  console.log(1);
  logger.start("start message");
  logger.info("info message", { data: [1, 2, 3] });
  logger.setPrefix("prefix");
  logger.warn("warn message");
  logger.error("error message", { data: null });
  logger.debug("debug message", { current: false });
  logger.event("event message", "click");
  logger.end("end message", { endData: [3, 2, 1] });
  console.log(2);
}
f1();
```
Output:
```
1
01.07.2025 16:59:09   START    start message   

01.07.2025 16:59:09   INFO     info message   {"data":[1,2,3]}   

01.07.2025 16:59:09   WARN    prefix   warn message   

01.07.2025 16:59:09   ERROR   prefix   error message   {"data":null}   

01.07.2025 16:59:09   DEBUG   prefix   debug message   {"current":false}   

01.07.2025 16:59:09   EVENT   prefix   event message   click

01.07.2025 16:59:09   END     prefix   end message   {"endData":[3,2,1]}   

2
after log to file
after log to file
after log to file
after log to file
after log to file
after log to file
after log to file
```
In the logging methods, I added text that runs after the log is written to the file.  

### Async 
```js
async function f2() {
  console.log(1);
  await logger.start("start message");
  await logger.info("info message", { data: [1, 2, 3] });
  logger.setPrefix("prefix");
  await logger.warn("warn message");
  await logger.error("error message", { data: null });
  await logger.debug("debug message", { current: false });
  await logger.event("event message", "click");
  await logger.end("end message", { endData: [3, 2, 1] });
  console.log(2);
}
f2();
```
Output:
```
1
01.07.2025 17:03:22   START    start message   

after log to file
01.07.2025 17:03:22   INFO     info message   {"data":[1,2,3]}   

after log to file
01.07.2025 17:03:22   WARN    prefix   warn message   

after log to file
01.07.2025 17:03:22   ERROR   prefix   error message   {"data":null}   

after log to file
01.07.2025 17:03:22   DEBUG   prefix   debug message   {"current":false}   

after log to file
01.07.2025 17:03:22   EVENT   prefix   event message   click

after log to file
01.07.2025 17:03:22   END     prefix   end message   {"endData":[3,2,1]}   

after log to file
2
```


## API
```start()```  
```end()```  
```info()```  
```warn()```  
```error()```  
```debug()```  
```event()```  
```setPrefix()```  
```setLevel()```  
```enable()```  
```disable()```   


## LICENSE
MIT
