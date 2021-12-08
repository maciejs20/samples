// moduł obsługuje endpointy informacyjne
// włącznie z readiness i liveness
// -------------------------------------

const os = require('os')
const md5 = require('md5')

// tablica kolorów
const colors = [
  'red',
  'blue',
  'gray',
  'green',
  'yellow',
  'tomato',
  'orange',
  'violet',
  'slateblue',
  'DodgerBlue',
  'olive'
]

let appConfig
const setConfig = function (value) {
  appConfig = value
}

const send200 = function (response) {
  response.writeHead(200, {
    'Content-Type': 'text/html;charset=utf8'
  })
}

// const send503 = function (response) {
//   response.writeHead(503, {
//     'Content-Type': 'text/html;charset=utf8'
//   })
// }

const ping = function (response) {
  // response to ping request
  send200(response)
  response.write('pong')
  response.end()
}
const info = function (response) {
  // response to info request - returns pod information
  const colnum = parseInt(md5(os.hostname), 16) % colors.length
  const color = colors[colnum]

  send200(response)
  response.write('<!DOCTYPE html> <html> <head> <title>Info Page</title> \n')
  response.write('<link rel="stylesheet" type="text/css" href="style.css" />\n')
  response.write('</head> <body>\n')
  response.write('<div class="outer">\n')
  response.write('<div class="inner">\n')
  response.write('<div  style="background-color: ' + color + '">I\'m alive</div>\n')
  response.write('<table class="styled-table">\n')
  response.write('<thead><tr><th>Element</th><th>Wartość</th></tr></thead>\n')
  response.write('<tbody>\n')
  response.write('<tr><td>Version:</td><td>' + '7.1' + '</td></tr>\n')
  response.write('<tr><td>Platform:</td><td>' + os.platform + '</td></tr>\n')
  response.write('<tr><td>OS Type :</td><td>' + os.type + '</td></tr>\n')
  response.write('<tr><td>Hostname:</td><td>' + os.hostname + '</td></tr>\n')
  response.write('<tr><td>TotalMem:</td><td>' + Math.round(os.totalmem / (1024 * 1024)) + ' MB</td></tr>\n')
  response.write('<tr><td>App port:</td><td>' + appConfig.appPort + '</td></tr>\n')
  response.write('<tr><td>File dir:</td><td>' + appConfig.filePath + '</td></tr>\n')
  response.write('<tr><td>Config mode:</td><td>' + appConfig.configMode + '</td></tr>\n')
  response.write('<tr><td>Startup env:</td><td>' + appConfig.startupEnv + '</td></tr>\n')
  response.write('</tbody>\n')
  response.write('</div></div>\n')
  response.end()
}

const livenessProbe = function (response) {
  // response to liveness probe - returns 200 OK when app is alive
  send200(response)
  response.write("I'm alive")
  response.end()
}

const readinessProbe = function (response) {
  // response to reainess probe - returns 200 OK when app is ready for requests
  send200(response)
  response.write("I'm ready")
  response.end()
}

module.exports = {
  ping: ping,
  info: info,
  readinessProbe: readinessProbe,
  livenessProbe: livenessProbe,
  setConfig: setConfig
}
