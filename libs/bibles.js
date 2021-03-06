/**
 * @overview 	Controller for Bibles
 * @module bibles
 * @author Dominik Sigmund
 * @version 0.2
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof myVerses
 * @requires module:fs
 * @requires module:path
 * @requires module:async
 * @requires lib:bible
 */
var fs = require('fs')
var path = require('path')
var async = require('async')
var BIBLE = require('./bible.js')

/** Creates a instance of class Bibles
 * @class Bibles
 * @param {string} biblepath - Path to Folder with xml bibles
 * @param {function} callback - Called after all is done
 * @returns {object} The Working User Object
 * */
function Bibles (biblepath, callback) {
  var self = this
  self.biblepath = biblepath
  self.bibles = []
  fs.readdir(biblepath, function (err, files) {
    if (err) {
      callback(err)
    } else {
      for (var i = 0; i < files.length; i++) {
        files[i] = path.join(self.biblepath, files[i])
      }
      async.map(files, BIBLE, function (err, results) {
        if (err) {
          callback(err)
        } else {
          self.bibles = results
          self.languages = createLanguages(results)
          self.books = createBookTranslationTable(results)
          callback(null, self)
        }
      })
    }
  })
}
/** Creates a language-version index of all bibles in use
 * @param {array} bibles - Array of Objects of class bible
 * @returns {object} The Language-Object
 * */
function createLanguages (bibles) {
  var languages = []
  for (var i = 0; i < bibles.length; i++) {
    var l = bibles[i].getInformationSync().language
    var v = bibles[i].getInformationSync().identifier
    var langFound = languages.filter(function (obj) {
      return obj.language.toString() === l.toString()
    })
    if (langFound.length < 1) { // new language
      languages.push({language: l, versions: [v]})
    } else { // language exists
      for (var j = 0; j < languages.length; j++) {
        if (languages[j].languages === l) {
          languages[j].languages.versions.push(v)
        }
      }
    }
  }
  return languages
}
/** Creates a TranslationTable-Object to find booknumbers by all codes, language is not needed
 * @param {array} bibles - Array of Objects of class bible
 * @returns {object} The TranslationTable-Object ( [ {code:number}])
 * */
function createBookTranslationTable (bibles) {
  var codes = []
  for (var i = 0; i < bibles.length; i++) {
    var b = bibles[i]
    for (var j = 0; j < b.length; j++) {
      var book = b[j]
      if (typeof book.short === 'undefined') {
        continue
      } else {
        var codeFound = codes.filter(function (obj) {
          return obj.code.toString() === book.short.toString()
        })
        if (codeFound.length < 1) {
          codes.push({code: book.short, number: book.number})
        }
      }
    }
  }
  return codes
}
// -------------------------------------------------------------------------------------------------------------
/** Searches for Text in all Bibles
 * @param {string} text - The Query
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bibles.prototype.search = function (text, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var verses = returnSearch(this.bibles, text)
    if (verses.length < 1) {
      callback({status: 404, message: 'No Verse with Query ' + text + ' found'})
    } else {
      callback(null, verses)
    }
  }
}
/** Sync Searches for Text in all Bibles
 * @param {string} text - The Query
 * @returns {array} An array of verses from all bibles
 * */
Bibles.prototype.searchSync = function (text) {
  return returnSearch(this.bibles, text)
}
/** Searches for Text in all Bibles
 * @param {array} bibles - Array of Objects of class bible
 * @param {string} text - The Query
 * @returns {array} An array of verses from all bibles
 * */
function returnSearch (bibles, text) {
  var verses = []
  for (var i = 0; i < bibles.length; i++) {
    verses = verses.concat(bibles[i].searchSync(text))
  }
  return verses
}
// -------------------------------------------------------------------------------------------------------------
/** Returns the language-version index of all bibles in use
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bibles.prototype.getLanguages = function (callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    callback(null, this.languages)
  }
}
/** SyncReturns the language-version index of all bibles in use
 * @returns {object} The Language-Object
 * */
Bibles.prototype.getLanguagesSync = function () {
  return this.languages
}
// -------------------------------------------------------------------------------------------------------------
/** Returns all Versions for the given language in use
 * @param {string} lang - The language
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bibles.prototype.getVersionsForLanguage = function (lang, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    callback(null, this.languages.filter(function (obj) {
      return obj.language.toString() === lang.toString()
    }))
  }
}
/** Sync Returns all Versions for the given language in use
 * @param {string} lang - The language
 * @returns {array} An array of version-codes
 * */
Bibles.prototype.getVersionsForLanguageSync = function (lang) {
  return this.languages.filter(function (obj) {
    return obj.language.toString() === lang.toString()
  })
}
// -------------------------------------------------------------------------------------------------------------
/** Returns a bible-Object for the language and version
 * @param {string} lang - The language
 * @param {string} version - The Version
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bibles.prototype.getBible = function (lang, version, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    callback(null, this.bibles.filter(function (obj) {
      var info = obj.getInformationSync()
      return info.language.toString() === lang.toString() && info.identifier.toString() === version.toString()
    }))
  }
}
/** Sync Returns a bible-Object for the language and version
 * @param {string} lang - The language
 * @param {string} version - The Version
 * @returns {object} A Bible Object
 * */
Bibles.prototype.getBibleSync = function (lang, version) {
  return this.bibles.filter(function (obj) {
    var info = obj.getInformationSync()
    return info.language.toString() === lang.toString() && info.identifier.toString() === version.toString()
  })
}
// -------------------------------------------------------------------------------------------------------------
/** Get Number of Book by Code. Important if a bible does not have codes
 * @param {string} code - The ShortName of the Book we Search
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bibles.prototype.getBookNumber = function (code, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var number = returnBookNumber(this.books, code)
    if (number === null) {
      callback({status: 404, message: 'No Book with Code ' + code + ' found'})
    } else {
      callback(null, number)
    }
  }
}
/** Sync Get Number of Book by Code. Important if a bible does not have codes
 * @param {string} code - The ShortName of the Book we Search
 * @returns {string} A Book-Number
 * */
Bibles.prototype.getBookNumberSync = function (code) {
  return returnBookNumber(this.books, code)
}
/** Return BookCode by Number
 * @param {array} books - TranslationTable-Object
 * @param {string} code - The ShortName of the Book we Search
 * @returns {string} A Book-Number
 * */
function returnBookNumber (books, code) {
  for (var i = 0; i < books.length; i++) {
    if (books[i].code === code) {
      return books[i].number
    }
  }
  return null
}
// -------------------------------------------------------------------------------------------------------------
/** Get Code of Book by Number. Important if a bible does not have codes
 * @param {string} number - The Number of the Book we Search
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bibles.prototype.getBookCode = function (number, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var code = returnBookCode(this.books, number)
    if (code === null) {
      callback({status: 404, message: 'No Book with Number ' + number + ' found'})
    } else {
      callback(null, code)
    }
  }
}
/** Sync Get Code of Book by Number. Important if a bible does not have codes
 * @param {string} number - The Number of the Book we Search
 * @returns {string} A Book-Code
 * */
Bibles.prototype.getBookCodeSync = function (number) {
  return returnBookCode(this.books, number)
}
/** Return BookNumber by Code
 * @param {array} books - TranslationTable-Object
 * @param {string} number - The Number of the Book we Search
 * @returns {string} A Book-Code
 * */
function returnBookCode (books, number) {
  for (var i = 0; i < books.length; i++) {
    if (books[i].number === number) {
      return books[i].code
    }
  }
  return null
}
// -------------------------------------------------------------------------------------------------------------
module.exports = Bibles
