const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const log = require('./appLogger.js')

// based on
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

function dbConnect () {
  log.info(`${myModName}: trying initialize connection do database: ${dbConfig.url}`)
  mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
  }).then(() => {
    log.info(`${myModName}: Successfully connected to the database`)
  }).catch(err => {
    log.error(`${myModName}: Could not connect to the database: ${err}. Will try again very soon...`)
    setTimeout(dbConnect, 5000)
    // process.exit()
  })
}

log.setup()
log.setLevel('DEBUG')

// create express app
const app = express()
app.use(cors())

const myModName = 'server.js'
const myVersion = '1.0'
const myPort = 3000

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
log.info(`${myModName}: version ${myVersion}: app starts.`)

dbConnect()

// Require Notes routes
require('./routes/note.routes.js')(app)

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.' })
})

// listen for requests
app.listen(myPort, () => {
  log.info(`${myModName}: Server is listening on port ${myPort}`)
})
