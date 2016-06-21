/**
 * @overview 	Controller for Bibles
 * @module bibles
 * @author Dominik Sigmund
 * @version 0.2
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof myVerses
 * @requires module:fs
 * @requires module:async
 * @requires lib:bible
 */
var fs = require('fs')
var async = require('async')
var BIBLE = require('./bible.js')

/** Creates a instance of class Bibles
 * @class Bibles
 * @param {string} biblepath - Path to Folder with xml bibles
 * @param {function} callback - Called after all is done
 * @returns {object} The Working User Object
 * */
function Bibles (biblepath, callback) {
  this.biblepath = biblepath
  this.bibles = []
  fs.readdir(biblepath, function (err, files) {
    if (err) {
      callback(err)
    } else {
      async.map(files, BIBLE, function (err, results) {
        if (err) {
          callback(err)
        } else {
          this.bibles = results
          this.structure = createStructure()
          this.languages = createLanguages()
          callback(null, this)
        }
      })
    }
  })
}
/** Creates structure information of the bible
 * @returns {object} The Structure Object
 * */
function createStructure () {
  // TODO: (bible structure (books, chapter-numbers, verse-count))
}
/** Creates a language-version index of all bibles in use
 * @returns {object} The Language-Object
 * */
function createLanguages () {
  // TODO:  ( lang: [version1, version2, ...])
}
/** Returns structure information of the bible
 * @returns {object} The Structure Object
 * */
Bibles.prototype.getStructure = function () {}
/** Searches for Text in all Bibles
 * @param {string} text - The Query
 * @returns {array} An array of verses from all bibles
 * */
Bibles.prototype.search = function (text) {}
/** Returns the language-version index of all bibles in use
 * @returns {object} The Language-Object
 * */
Bibles.prototype.getLanguages = function () {}
/** Returns all Versions for the given language in use
 * @param {string} lang - The language
 * @returns {array} An array of version-codes
 * */
Bibles.prototype.getVersionsForLanguage = function (lang) {}
/** Returns a bible-Object for the language and version
 * @param {string} lang - The language
 * @param {string} version - The Version
 * @returns {object} A Bible Object
 * */
Bibles.prototype.getBible = function (lang, version) {}

module.exports = Bibles
