const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const log = require('./appLogger.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')

log.setup()
log.setLevel('DEBUG')

// create express app
const app = express()
app.use(cors())

const myModName = 'server.js'
const myVersion = '1.0'
const myPort = 3001

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
  resave: false,
  saveUninitialized: true
}))

log.info(`${myModName}: version ${myVersion}: app starts.`)

// Require Auth routes
require('./routes/auth.routes.js')(app)

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to auth application.' })
})

// listen for requests
app.listen(myPort, () => {
  log.info(`${myModName}: Server is listening on port ${myPort}`)
})
