/* TODO:
* passport auth
*/
/**
 * @overview 	Main Server File
 * @module app
 * @author Dominik Sigmund
 * @version 0.5
 * @description	Starts the Server and keeps it running
 * @memberof myVerses
 */

// Require needed modules
require('nice-console')(console)
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var pack = require('./package.json')
var io = require('socket.io').listen(server)
var bodyParser = require('body-parser')
var BIBLES = require('./libs/bibles.js')
var USER = require('./libs/user.js')

// Send public and docs
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/doc'))

// Accept JSON Body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Create BibleService
var bibles = new BIBLES(pack.config.bibles, function (err) {
  if (err) {
    console.error(err)
  } else {
    var users = new USER(pack.config.database.users, require('bcrypt'), function () {
      // Listen to Port
      server.listen(pack.config.port)

      // Routes
      require('./routes')(app, bibles, users)

      /** Handles exitEvents by destroying bibles first
      * @param {object} options - Some Options
      * @param {object} err - An Error Object
      */
      function exitHandler (options, err) {
        console.log('Exiting...')
        bibles.destroy(function () {
          process.exit()
        })
      }
      // catches ctrl+c event
      process.on('SIGINT', exitHandler)
      // catches uncaught exceptions
      process.on('uncaughtException', function (err) {
        console.error(err)
        exitHandler(null, err)
      })
      // keep running
      process.stdin.resume()
    })
  }
})
