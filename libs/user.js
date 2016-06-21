/**
 * @overview 	Controller for User Database
 * @module user
 * @author Dominik Sigmund
 * @version 0.1
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof myVerses
 * @requires module:jsonfile
 * @requires module:fs
 */
var jsonfile = require('jsonfile')
var fs = require('fs')
/** Creates a instance of class User
 * @class User
 * @param {string} path - Path to Folder with user-json-files
 * @param {object} bcrypt - Instance of bcrypt module
 * @param {function} callback - Called after all is done
 * @returns {object} The Working User Object
 * */
function User (path, bcrypt, callback) {
  this.path = path
  this.bcrypt = bcrypt
  try {
    fs.accessSync(path + '/../myVerses.salt')
    this.salt = fs.readFileSync(path + '/../myVerses.salt').toString()
  } catch (e) {
    this.salt = this.bcrypt.genSaltSync(10)
    fs.writeFileSync(path + '/../myVerses.salt', this.salt)
  }
  this.users = []
  var files = fs.readdirSync(path)
  for (var i = 0; i < files.length; i++) {
    this.users.push(jsonfile.readFileSync(path + '/' + files[i]))
  }
}
/** Returns an array of all Users
 * @returns {array} Array of Users
 * */
User.prototype.getUsers = function () { return this.users }
/** Returns an user-object for the given ID
 * @param {string} id - ID of an User
 * @returns {object} An User-Object
 * */
User.prototype.getUser = function (id) { }
/** Updates an user-object with the given ID using given User-Object
 * @param {string} id - ID of an User
 * @param {object} user - An User-Object
 * @returns {object} An User-Object
 * */
User.prototype.updateUser = function (id, user) { }
/** Creates an user-object using given User-Object
 * @param {object} user - An User-Object
 * @returns {object} An User-Object
 * */
User.prototype.createUser = function (user) { }
/** Deletes an user-object for the given ID
 * @param {string} id - ID of an User
 * @returns {bool} True or False
 * */
User.prototype.deleteUser = function (id) { }
/** Returns all verses from the user for the given ID
 * @param {string} id - ID of an User
 * @returns {array} An Array of Verse-Objects
 * */
User.prototype.getVerses = function (id) { }
/** Checks if User-Login is true
 * @param {string} login - Login of an User
 * @param {string} password - md5-hashed password
 * @returns {string|null} null or the id of the user
 * */
User.prototype.checkLogin = function (login, password) { }
/** Generate a Token for the user, allowing to perform tasks
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @returns {string} a token
 * */
User.prototype.generateToken = function (id, ip, useragent) { }
/** Checks if a Token for a user is valid
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @param {string} token - token of the external client
 * @returns {bool} true or false
 * */
User.prototype.checkToken = function (id, ip, useragent, token) { }

module.exports = User
