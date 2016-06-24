/**
 * @overview 	Controller for a single Bible
 * @module bible
 * @author Dominik Sigmund
 * @version 0.1
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof myVerses
 * @requires module:fs
 */
var fs = require('fs')
/** Creates a instance of class Bibles
 * @class Bibles
 * @param {string} xmlbible - Path to a XML-Bible from Zefania.
 * @param {function} callback - Called after all is done
 * @returns {object} The Working User Object
 * */
function Bible (xmlbible, callback) {
  this.xmlbible = xmlbible
// TODO: read in bible (check if is xml before!)
/** basic information into this.information
* struct:
* this.bible[  {book-name, book-nr, ..., chapters:[   chapter-nr, chapter-name, ..., verses: [   {nr, text, code, lang, version}  ]  ]  },... ]
*/
}
/** Return the Information Object
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getInformation = function (callback) {}
/** Sync Return the Information Object
 * @returns {object} - An information object
 * */
Bible.prototype.getInformationSync = function () {}
/** Return the Bible Object
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getBible = function (callback) {}
/** Sync Return the Bible Object
 * @returns {object} - A bible object
 * */
Bible.prototype.getBibleSync = function () {}
/** Return All books in the bible
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getBooks = function (callback) {}
/** Sync Return All books in the bible
 * @returns {array} - An array of books
 * */
Bible.prototype.getBooksSync = function () {}
/** Return the Book Object
 * @param {string} id - The ID of the Book
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getBook = function (id, callback) {}
/** Sync Return the Book Object
 * @param {string} id - The ID of the Book
 * @returns {object} - A Book object
 * */
Bible.prototype.getBookSync = function (id) {}
/** Return All chapters in the book
 * @param {string} bookid - The ID of the Book
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getChapters = function (bookid, callback) {}
/** Sync Return All chapters in the book
 * @param {string} bookid - The ID of the Book
 * @returns {array} - An array of chapters
 * */
Bible.prototype.getChaptersSync = function (bookid) {}
/** Return the Chapter Object
 * @param {string} id - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getChapter = function (bookid, nr, callback) {}
/** Sync Return the Chapter Object
 * @param {string} id - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @returns {object} - A Chapter object
 * */
Bible.prototype.getChapterSync = function (bookid, nr) {}
/** Return All Verses in the chapter
 * @param {string} bookid - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getVerses = function (bookid, chapter, callback) {}
/** Sync Return All Verses in the chapter
 * @param {string} bookid - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @returns {array} - An array of verses
 * */
Bible.prototype.getVersesSync = function (bookid, chapter) {}
/** Return the Verse Object
 * @param {string} id - The ID of the Book
 * @param {string} chapter - The Nr of the Chapter
 * @param {string} nr - The Nr of the Verse
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getVerse = function (bookid, chapter, nr, callback) {}
/** Sync Return the Verse Object
 * @param {string} id - The ID of the Book
 * @param {string} chapter - The Nr of the Chapter
 * @param {string} nr - The Nr of the Verse
 * @returns {object} - A Verse object
 * */
Bible.prototype.getVerseSync = function (bookid, chapter, nr) {}
/** Return the Verse Object
 * @param {string} code - The Code of the Verse BOOK-CHAPTER-VERSE
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getVerseByCode = function (code, callback) {}
/** Sync Return the Verse Object
 * @param {string} code - The Code of the Verse BOOK-CHAPTER-VERSE
 * @returns {object} - A Verse object
 * */
Bible.prototype.getVerseByCodeSync = function (code) {}
/** Return All Verses in the bible matching the text
 * @param {string} text - The Query to search for
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.search = function (text, callback) {}
/** Sync Return All Verses in the bible matching the text
 * @param {string} text - The Query to search for
 * @returns {array} - An array of verses
 * */
Bible.prototype.searchSync = function (text) {}
module.exports = Bible
