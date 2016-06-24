/**
 * @overview 	Route Index File
 * @module index
 * @author Dominik Sigmund
 * @version 1.0
 * @description	Exports all Routes
 * @memberof myVerses
 */

/** Exports Routes
* @param {object} app - Express app
* @param {object} bibles - Bibles Object
* @param {object} users - Users Object
*/
module.exports = function (app, bibles, users) {
  /** Middleware to Log every route ANd streamline language/version
  * @param {object} req - Express.req Object
  * @param {object} res - Express.res Object
  * @param {object} next - Express.next Object
  * @returns {undefined}
  */
  app.use(function (req, res, next) {
    if (typeof req.query.language === 'undefined') {
      if (typeof req.headers.language === 'undefined') {
        res.status(500).end('No Language Selected')
      } else {
        req.query.language = req.headers.language
      }
    }
    if (typeof req.query.version === 'undefined') {
      if (typeof req.headers.version === 'undefined') {
        res.status(500).end('No version Selected')
      } else {
        req.query.version = req.headers.version
      }
    }
    // console.log(req)
    next()
  })

  // Load Bible Routes
  require('./bible.js')(app, bibles, users)
  // Load Stats Routes
  require('./stats.js')(app, bibles)
  // Load User Routes
  require('./user.js')(app, users)
  // Load Export Routes
  require('./export.js')(app, users)

  // Sends status information
  app.get('/status', function (req, res) {
    // TODO: send status
  })
  /** Middleware to Catch Errors
  * @param {object} err - Express.err Object
  * @param {object} req - Express.req Object
  * @param {object} res - Express.res Object
  * @param {object} next - Express.next Object
  * @returns {undefined}
  */
  app.use(function (err, req, res, next) {
    console.error(err)
  })
}
