const os = require('os')

// Retrieve and return connection state to DB.
exports.status = (req, res) => {
  res.send(
    {
      // dbUrl: dbConfig.url,
      status: 'ok',
      os: os.type(),
      arch: os.arch(),
      hostname: os.hostname()
    }
  )
}

exports.authorize = (req, res) => {
  // Validate request

  let Cookies = JSON.stringify(req.cookies)
  console.log('cookie: ', Cookies)

  if (!req.body.username && !req.body.password) {
    console.log('authorize error: empty login data.')
    return res.status(400).send({
      message: 'Auth content can not be empty'
    })
  }
  console.log(req.body)
  res.send({
    code: 200,
    session: '923ue0293ue02u3ru04r'
  })
}

exports.verify = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Auth content can not be empty'
    })
  }
  console.log(req.body)
  res.send({
    message: 'ver ok'
  })
}

exports.disconnect = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Auth content can not be empty'
    })
  }
  console.log(req.body)
  res.send({
    message: 'dis ok'
  })
}
