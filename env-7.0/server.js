// program listuje zmienne środowiskowe jakie otrzymuje przy uruchomieniu
// ---------------------------------------------------------
const os = require('os');
const util = require('util');
const sprintf = require('sprintf-js').sprintf

const TIMEOUT_EXIT=1000*60*5

const env = process.env;
console.log(`Running on: ${os.hostname()} [${os.type()}, ${os.arch()}]`);
console.log("Environemnt variables:");

//sort env entries
keysSorted = Object.keys(env).sort(function (a, b) {
  return a.localeCompare(b);
})

//print them out
keysSorted.forEach(function (value) {
  console.log(sprintf("    %20s=%s",value, env[value]));
});
console.log("Waiting for finish - timeout [ms]:" + TIMEOUT_EXIT)

setTimeout(function () {
  console.log("Program exits.")
}, TIMEOUT_EXIT, 0);