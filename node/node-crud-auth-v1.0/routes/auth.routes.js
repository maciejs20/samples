module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js')

  // Establish session
  app.post('/authorize', auth.authorize)

  // Verify session
  app.post('/verify', auth.verify)

  // Kill session
  app.post('/disconnect', auth.disconnect)

  // Get connection status
  app.get('/status', auth.status)
}
