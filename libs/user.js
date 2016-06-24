/**
 * @overview 	Controller for User Database
 * @module user
 * @author Dominik Sigmund
 * @version 0.9
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof myVerses
 * @requires module:jsonfile
 * @requires module:fs
 * @requires module:uuid
 */
var jsonfile = require('jsonfile')
var fs = require('fs')
var uuid = require('uuid')
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
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
User.prototype.getUsers = function (callback) {
  return callback(null, this.users)
}
/** Sync Returns an array of all Users
 * @returns {array} Array of Users
 * */
User.prototype.getUsersSync = function () {
  return this.users
}
/** Returns an user-object for the given ID
 * @param {string} id - ID of an User
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
User.prototype.getUser = function (id, callback) {
  var users = this.users.filter(function (obj) {
    return obj.id.toString() === id.toString()
  })
  if (users.length > 0) {
    if (typeof users[0] !== 'undefined') {
      return callback(null, users[0])
    } else {
      return callback({status: 404, message: 'User with ID ' + id + ' not found'})
    }
  } else {
    return callback({status: 404, message: 'User with ID ' + id + ' not found'})
  }
}
/** Sync Returns an user-object for the given ID
 * @param {string} id - ID of an User
 * @returns {object} An User-Object
 * */
User.prototype.getUserSync = function (id) {
  var users = this.users.filter(function (obj) {
    return obj.id.toString() === id.toString()
  })
  if (users.length > 0) {
    if (typeof users[0] !== 'undefined') {
      return users[0]
    } else {
      return null
    }
  } else {
    return null
  }
}
/** Returns an user-object for the given Login
 * @param {string} id - ID of an User
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
User.prototype.getUserByLogin = function (login, callback) {
  var users = this.users.filter(function (obj) {
    if (obj.login.method === 'local') {
      return obj.login.login.toString() === login.toString()
    } else {
      return false
    }
  })
  if (users.length > 0) {
    if (typeof users[0] !== 'undefined') {
      return callback(null, users[0])
    } else {
      return callback({status: 404, message: 'User with Login ' + login + ' not found'})
    }
  } else {
    return callback({status: 404, message: 'User with Login ' + login + ' not found'})
  }
}
/** Sync Returns an user-object for the given Login
 * @param {string} id - ID of an User
 * @returns {object} An User-Object
 * */
User.prototype.getUserByLoginSync = function (login) {
  var users = this.users.filter(function (obj) {
    if (obj.login.method === 'local') {
      return obj.login.login.toString() === login.toString()
    } else {
      return false
    }
  })
  if (users.length > 0) {
    if (typeof users[0] !== 'undefined') {
      return users[0]
    } else {
      return null
    }
  } else {
    return null
  }
}
/** Updates an user-object with the given ID using given User-Object
 * @param {string} id - ID of an User
 * @param {object} user - An User-Object
 * @param {callback} callback - An error-first callback, having the return-data as second parameter
 * */
User.prototype.updateUser = function (id, user, callback) {
  var self = this
  var updated = false
  if (user.login.method === 'local' && user.login.password !== null) {
    user.login.password = this.bcrypt.hash(user.login.password, self.salt, function (err, result) {
      if (err) {
        return callback(error)
      } else {
        for (var i = 0;i < this.users.length;i++) {
          if (this.users[i].id === id) {
            this.users[i] = user
            updated = true
          }
        }
        if (updated) {
          jsonfile.writeFile(self.path + id + '.json', user, function (error) {
            if (error) {
              return callback(error)
            } else {
              return callback(null, user)
            }
          })
        } else {
          return callback({status: 404, message: 'User with ID ' + id + ' not found'})
        }
      }
    })
  } else {
    for (var i = 0;i < this.users.length;i++) {
      if (this.users[i].id === id) {
        this.users[i] = user
        updated = true
      }
    }
    if (updated) {
      jsonfile.writeFile(self.path + id + '.json', user, function (error) {
        if (error) {
          return callback(error)
        } else {
          return callback(null, user)
        }
      })
    } else {
      return callback({status: 404, message: 'User with ID ' + id + ' not found'})
    }
  }
}
/** Sync Updates an user-object with the given ID using given User-Object
 * @param {string} id - ID of an User
 * @param {object} user - An User-Object
 * @returns {bool|object} An User-Object or an error status
 * */
User.prototype.updateUserSync = function (id, user) {
  var self = this
  var updated = false
  if (user.login.method === 'local' && user.login.password !== null) {
    user.login.password = this.bcrypt.hashSync(user.login.password, self.salt)
  }
  for (var i = 0;i < this.users.length;i++) {
    if (this.users[i].id === id) {
      this.users[i] = user
      jsonfile.writeFileSync(self.path + id + '.json', user)
      updated = true
      return user
    }
  }
  if (!updated) {
    return false
  } else {
    return user
  }
}
/** Creates an user-object using given User-Object
 * @param {object} user - An User-Object
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * @returns {object} An User-Object
 * */
User.prototype.createUser = function (user, callback) {
  var self = this
  var existing = this.users.filter(function (obj) {
    return obj.mail.toString() === user.mail.toString()
  })
  if (existing.length > 0) {
    return callback({status: 409, message: 'User with E-Mail ' + user.mail + ' already exists'})
  } else {
    user.id = uuid.v4()
    if (user.login.method === 'local') {
      user.login.password = this.bcrypt.hash(user.login.password, self.salt, function (error, result) {
        if (error) {
          return callback(error)
        } else {
          user.login.password = result
          this.users.push(user)
          jsonfile.writeFile(self.path + user.id + '.json', user, function (error) {
            if (error) {
              return callback(error)
            } else {
              return callback(null, user)
            }
          })
        }
      })
    } else {
      this.users.push(user)
      jsonfile.writeFile(self.path + user.id + '.json', user, function (error) {
        if (error) {
          return callback(error)
        } else {
          return callback(null, user)
        }
      })
    }
  }
}
/** Sync Creates an user-object using given User-Object
 * @param {object} user - An User-Object
 * @returns {object} An User-Object
 * */
User.prototype.createUserSync = function (user) {
  var self = this
  var existing = this.users.filter(function (obj) {
    return obj.mail.toString() === user.mail.toString()
  })
  if (existing.length > 0) {
    return null
  } else {
    if (user.login.method === 'local') {
      user.login.password = this.bcrypt.hashSync(user.login.password, self.salt)
    }
    user.id = uuid.v4()
    this.users.push(user)
    jsonfile.writeFileSync(self.path + user.id + '.json', user)
    return user
  }
}
/** Deletes an user-object for the given ID
 * @param {string} id - ID of an User
 * @param {callback} callback - error-only callback
 * */
User.prototype.deleteUser = function (id, callback) {
  var self = this
  var removed = false
  for (var i = 0; i < self.users.length; i++) {
    if (self.users[i].id === id) {
      self.users.splice(i, 1)
      removed = true
    }
  }
  if (removed) {
    return fs.unlink(self.path + id + '.json', callback)
  } else {
    return callback({status: 404, message: 'User with ID ' + id + ' not found'})
  }
}
/** Sync Deletes an user-object for the given ID
 * @param {string} id - ID of an User
 * @returns {bool} True or False
 * */
User.prototype.deleteUserSync = function (id) {
  var self = this
  var removed = false
  for (var i = 0; i < self.users.length; i++) {
    if (self.users[i].id === id) {
      self.users.splice(i, 1)
      removed = true
    }
  }
  if (removed) {
    fs.unlinkSync(self.path + id + '.json')
    return true
  } else {
    return false
  }
}
/** Returns all verses from the user for the given ID
 * @param {string} id - ID of an User
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * */
User.prototype.getVerses = function (id, callback) {
  this.getUser(id, function (error, user) {
    if (error) {
      return callback(error)
    } else {
      return callback(null, user.verses)
    }
  })
}
/** Sync Returns all verses from the user for the given ID
 * @param {string} id - ID of an User
 * @returns {array} An Array of Verse-Objects
 * */
User.prototype.getVersesSync = function (id, callback) {
  var user = this.getUserSync(id)
  if (typeof user !== 'undefined' && user !== null) {
    return user.verses
  } else {
    return null
  }
}
/** Checks if User-Login is true
 * @param {string} login - Login of an User
 * @param {string} password - md5-hashed password
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * */
User.prototype.checkLogin = function (login, password, callback) {
  var self = this
  self.getUserByLogin(login, function (error, user) {
    if (error) {
      return callback(error)
    } else {
      return self.bcrypt.compare(password, user.login.password, callback)
    }
  })
}
/** Sync Checks if User-Login is true
 * @param {string} login - Login of an User
 * @param {string} password - md5-hashed password
 * @returns {boolean|null} null or true, false
 * */
User.prototype.checkLoginSync = function (login, password, callback) {
  var self = this
  var user = self.getUserByLoginSync(login)
  if (typeof user !== 'undefined' && user !== null) {
    return self.bcrypt.compareSync(password, user.login.password)
  } else {
    return null
  }
}
/** Generate a Token for the user, allowing to perform tasks
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * */
User.prototype.generateToken = function (id, ip, useragent, callback) {
  return this.bcrypt.hash(id + ip + useragent, this.salt, null, callback)
}
/** Sync Generate a Token for the user, allowing to perform tasks
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @returns {string} a token
 * */
User.prototype.generateTokenSync = function (id, ip, useragent) {
  return this.bcrypt.hashSync(id + ip + useragent, this.salt)
}
/** Checks if a Token for a user is valid
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @param {string} token - token of the external client
 * @param {callback} callback An optional, error-first callback, having the return-data as second parameter
 * */
User.prototype.checkToken = function (id, ip, useragent, token, callback) {
  return this.bcrypt.compare(id + ip + useragent, token, callback)
}
/** Sync Checks if a Token for a user is valid
 * @param {string} id - ID of an User
 * @param {string} ip - ip of the external client
 * @param {string} useragent - user-agent of the external client
 * @param {string} token - token of the external client
 * @returns {bool} true or false
 * */
User.prototype.checkTokenSync = function (id, ip, useragent, token) {
  return this.bcrypt.compareSync(id + ip + useragent, token)
}
module.exports = User
