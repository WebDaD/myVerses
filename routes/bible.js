/**
 * @overview 	Route Bibles File
 * @module index
 * @author Dominik Sigmund
 * @version 1.0
 * @description	Exports Bible Related Routes
 * @memberof myVerses
 */

/** Exports Routes
* @param {object} app - Express app
* @param {object} bibles - Bibles Object
* @param {object} users - Users Object
*/
module.exports = function (app, bibles, users) {
  app.get('/api/languages', function (req, res) {
    bibles.getLanguages(function (error, languages) {
      if (error) {
        res.status(500).send(error)
      } else {
        res.status(200).send(languages)
      }
    })
  })
  app.get('/api/bible', app.LVC(), function (req, res) {
    bibles.getBible(req.query.language, req.query.version, function (error, bible) {
      if (error) {
        res.status(500).send(error)
      } else {
        res.status(200).send(bible)
      }
    })
  })
  app.get('/api/bible/:book', app.LVC(), function (req, res) {})
  app.get('/api/bible/:book/chapters', app.LVC(), function (req, res) {})
  app.get('/api/bible/:book/:chapter', app.LVC(), function (req, res) {})
  app.get('/api/bible/:book/:chapter/verses', app.LVC(), function (req, res) {})
  app.get('/api/bible/:book/:chapter/:verse', app.LVC(), function (req, res) {})
  app.get('/api/:code', app.LVC(), function (req, res) {})
  app.get('/api/:code/:userid', function (req, res) {})
}
