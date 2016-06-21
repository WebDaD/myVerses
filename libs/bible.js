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
 * @returns {object} - An information object
 * */
Bible.prototype.getInformation = function () {}
/** Return the Bible Object
 * @returns {object} - A bible object
 * */
Bible.prototype.getBible = function () {}
/** Return All books in the bible
 * @returns {array} - An array of books
 * */
Bible.prototype.getBooks = function () {}
/** Return the Book Object
 * @param {string} id - The ID of the Book
 * @returns {object} - A Book object
 * */
Bible.prototype.getBook = function (id) {}
/** Return All chapters in the book
 * @param {string} bookid - The ID of the Book
 * @returns {array} - An array of chapters
 * */
Bible.prototype.getChapters = function (bookid) {}
/** Return the Chapter Object
 * @param {string} id - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @returns {object} - A Chapter object
 * */
Bible.prototype.getChapter = function (bookid, nr) {}
/** Return All Verses in the chapter
 * @param {string} bookid - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @returns {array} - An array of verses
 * */
Bible.prototype.getVerses = function (bookid, chapter) {}
/** Return the Verse Object
 * @param {string} id - The ID of the Book
 * @param {string} chapter - The Nr of the Chapter
 * @param {string} nr - The Nr of the Verse
 * @returns {object} - A Verse object
 * */
Bible.prototype.getVerse = function (bookid, chapter, nr) {}
/** Return the Verse Object
 * @param {string} code - The Code of the Verse BOOK-CHAPTER-VERSE
 * @returns {object} - A Verse object
 * */
Bible.prototype.getVerseByCode = function (code) {}
/** Return All Verses in the bible matching the text
 * @param {string} text - The Query to search for
 * @returns {array} - An array of verses
 * */
Bible.prototype.search = function (text) {}

module.exports = Bible
