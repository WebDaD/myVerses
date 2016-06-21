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
  if (typeof callback === 'function') {
    return callback(null, this)
  } else {
    return this
  }
}
/** Returns an array of all Users
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {array} Array of Users
 * */
User.prototype.getUsers = function (callback) {
  if (typeof callback === 'function') {
    return callback(null, this.users)
  } else {
    return this.users
  }
}
/** Returns an user-object for the given ID
 * @param {string} id - ID of an User
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {object} An User-Object
 * */
User.prototype.getUser = function (id, callback) {
  var users = this.users.filter(function (obj) {
    return obj.id.toString() === id.toString()
  })
  if (users.length > 0) {
    if (typeof users[0] !== 'undefined') {
      if (typeof callback === 'function') {
        callback(null, users[0])
      } else {
        return users[0]
      }
    } else {
      if (typeof callback === 'function') {
        callback({status: 404, message: 'User with ID ' + id + ' not found'})
      } else {
        return null
      }
    }
  } else {
    if (typeof callback === 'function') {
      callback({status: 404, message: 'User with ID ' + id + ' not found'})
    } else {
      return null
    }
  }
}

/** Updates an user-object with the given ID using given User-Object
 * @param {string} id - ID of an User
 * @param {object} user - An User-Object
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {object} An User-Object
 * */
User.prototype.updateUser = function (id, user, callback) {}
/** Creates an user-object using given User-Object
 * @param {object} user - An User-Object
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {object} An User-Object
 * */
User.prototype.createUser = function (user, callback) {}
/** Deletes an user-object for the given ID
 * @param {string} id - ID of an User
 * @returns {bool} True or False
 * */
User.prototype.deleteUser = function (id, callback) {}
/** Returns all verses from the user for the given ID
 * @param {string} id - ID of an User
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {array} An Array of Verse-Objects
 * */
User.prototype.getVerses = function (id, callback) {}
/** Checks if User-Login is true
 * @param {string} login - Login of an User
 * @param {string} password - md5-hashed password
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {string|null} null or the id of the user
 * */
User.prototype.checkLogin = function (login, password, callback) {}
/** Generate a Token for the user, allowing to perform tasks
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {string} a token
 * */
User.prototype.generateToken = function (id, ip, useragent, callback) {}
/** Checks if a Token for a user is valid
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @param {string} token - token of the external client
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * @returns {bool} true or false
 * */
User.prototype.checkToken = function (id, ip, useragent, token, callback) {}

module.exports = User
