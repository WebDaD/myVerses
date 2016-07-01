/**
 * @overview 	Controller for a single Bible
 * @module bible
 * @author Dominik Sigmund
 * @version 0.1
 * @description	Creates an Object. Has specific methods to show and manipulate data
 * @memberof myVerses
 * @requires module:fs
 * @requires module:xml2js
 */
var fs = require('fs')
var xml2js = require('xml2js')
/** Creates a instance of class Bibles
 * @class Bibles
 * @param {string} xmlbible - Path to a XML-Bible from Zefania.
 * @param {function} callback - Called after all is done
 * @returns {object} The Working User Object
 * */
function Bible (xmlbible, callback) {
  var self = this
  self.bible = []
  self.information = {}
  self.xmlbible = xmlbible
  var parser = new xml2js.Parser({ explicitArray: false, trim: true })
  fs.readFile(xmlbible, function (err, data) {
    if (err) {
      return callback(err)
    } else {
      parser.parseString(data, function (err, result) {
        if (err) {
          return callback(err)
        } else {
          self.information = result.XMLBIBLE.INFORMATION
          result.XMLBIBLE.BIBLEBOOK.forEach(function (xbook) {
            var book = {
              name: (typeof xbook['$'].bname !== 'undefined') ? xbook['$'].bname : '',
              number: xbook['$'].bnumber,
              short: (typeof xbook['$'].bsname !== 'undefined') ? xbook['$'].bsname : '',
              chapters: []
            }
            if (xbook.CHAPTER.length > 0) {
              xbook.CHAPTER.forEach(function (xchapter) {
                var chapter = {
                  number: xchapter['$'].cnumber,
                  verses: []
                }
                if (xchapter.VERS.length > 0) {
                  xchapter.VERS.forEach(function (xverse) {
                    var verse = {
                      number: xverse['$'].vnumber,
                      text: xverse['_']
                    }
                    chapter.verses.push(verse)
                  })
                } else {
                  var xverse = xchapter.VERS
                  var verse = {
                    number: xverse['$'].vnumber,
                    text: xverse['_']
                  }
                  chapter.verses.push(verse)
                }
                book.chapters.push(chapter)
              })
            } else {
              var xchapter = xbook.CHAPTER
              var chapter = {
                number: xchapter['$'].cnumber,
                verses: []
              }
              if (xchapter.VERS.length > 0) {
                xchapter.VERS.forEach(function (xverse) {
                  var verse = {
                    number: xverse['$'].vnumber,
                    text: xverse['_']
                  }
                  chapter.verses.push(verse)
                })
              } else {
                var xverse = xchapter.VERS
                var verse = {
                  number: xverse['$'].vnumber,
                  text: xverse['_']
                }
                chapter.verses.push(verse)
              }
              book.chapters.push(chapter)
            }
            self.bible.push(book)
          })
        }
      })
    }
  })
}
// -------------------------------------------------------------------------------------------------------------
/** Return the Information Object
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getInformation = function (callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    callback(null, this.information)
  }
}
/** Sync Return the Information Object
 * @returns {object} - An information object
 * */
Bible.prototype.getInformationSync = function () {
  return this.information
}
// -------------------------------------------------------------------------------------------------------------
/** Return the Bible Object
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getBible = function (callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    callback(null, this.bible)
  }
}
/** Sync Return the Bible Object
 * @returns {object} - A bible object
 * */
Bible.prototype.getBibleSync = function () {
  return this.bible
}
// -------------------------------------------------------------------------------------------------------------
/** Return All books in the bible
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getBooks = function (callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    if (this.bible.books.length < 1) {
      callback({status: 404, message: 'No Books in Bible'})
    } else {
      callback(null, this.bible.books)
    }
  }
}
/** Sync Return All books in the bible
 * @returns {array} - An array of books
 * */
Bible.prototype.getBooksSync = function () {
  return this.bible.books
}
// -------------------------------------------------------------------------------------------------------------
/** Return the Book Object
 * @param {string} number - The number of the Book
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getBook = function (number, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var book = returnBook(this.bible, number)
    if (book === null) {
      callback({status: 404, message: 'No Book with Number ' + number + ' found'})
    } else {
      callback(null, book)
    }
  }
}
/** Sync Return the Book Object
 * @param {string} id - The ID of the Book
 * @returns {object} - A Book object
 * */
Bible.prototype.getBookSync = function (number) {
  return returnBook(this.bible, number)
}
/**  Return the Book Object
 * @param {object} bible - bible-object
 * @param {string} number - The number of the Book
 * @returns {object} - A Book object
 * */
function returnBook (bible, number) {
  for (var i = 0; i < bible.books.length; i++) {
    if (bible.books[i].number === number) {
      return bible.books[i]
    }
  }
  return null
}

// -------------------------------------------------------------------------------------------------------------
/** Return All chapters in the book
 * @param {string} bookid - The ID of the Book
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getChapters = function (bookid, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var chapters = returnChapters(this.bible, bookid)
    if (chapters.length < 1) {
      callback({status: 404, message: 'No Chapters in Book with Number ' + bookid + ' found'})
    } else {
      callback(null, chapters)
    }
  }
}
/** Sync Return All chapters in the book
 * @param {string} bookid - The ID of the Book
 * @returns {array} - An array of chapters
 * */
Bible.prototype.getChaptersSync = function (bookid) {
  return returnChapters(this.bible, bookid)
}
/** Return All chapters in the book
* @param {object} bible - bible-object
* @param {string} bookid - The number of the Book
 * @returns {array} - An array of chapters
 * */
function returnChapters (bible, number) {
  for (var i = 0; i < bible.books.length; i++) {
    if (bible.books[i].number === number) {
      return bible.books[i].chapters
    }
  }
  return null
}
// -------------------------------------------------------------------------------------------------------------
/** Return the Chapter Object
 * @param {string} id - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getChapter = function (bookid, nr, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var chapter = returnChapter(this.bible, bookid, nr)
    if (chapter === null) {
      callback({status: 404, message: 'No Chapter with Number ' + nr + 'found in Book with Number ' + bookid + ' found'})
    } else {
      callback(null, chapter)
    }
  }
}
/** Sync Return the Chapter Object
 * @param {string} id - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @returns {object} - A Chapter object
 * */
Bible.prototype.getChapterSync = function (bookid, nr) {
  return returnChapter(this.bible, bookid, nr)
}
/** Return the Chapter Object
 * @param {object} bible - bible-object
 * @param {string} bookid - The ID of the Book
 * @param {string} chapterid - The Nr of the Chapter
 * @returns {object} - A Chapter object
 * */
function returnChapter (bible, bookid, chapterid) {
  for (var i = 0; i < bible.books.length; i++) {
    if (bible.books[i].number === bookid) {
      for (var j = 0; j < bible.books[i].chapters.length; i++) {
        if (bible.books[i].chapters[j].number === chapterid) {
          return bible.books[i].chapters[j]
        }
      }
    }
  }
  return null
}
// -------------------------------------------------------------------------------------------------------------
/** Return All Verses in the chapter
 * @param {string} bookid - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getVerses = function (bookid, chapter, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var verses = returnVerses(this.bible, bookid, chapter)
    if (verses.length < 1) {
      callback({status: 404, message: 'No Verses in Chapter with Number ' + chapter + ' in Book with Number ' + bookid + ' found'})
    } else {
      callback(null, verses)
    }
  }
}
/** Sync Return All Verses in the chapter
 * @param {string} bookid - The ID of the Book
 * @param {string} nr - The Nr of the Chapter
 * @returns {array} - An array of verses
 * */
Bible.prototype.getVersesSync = function (bookid, chapter) {
  return returnVerses(this.bible, bookid, chapter)
}
/** Return All Verses in the chapter
 * @param {object} bible - bible-object
 * @param {string} bookid - The ID of the Book
 * @param {string} chapterid - The Nr of the Chapter
 * @returns {array} - An array of verses
 * */
function returnVerses (bible, bookid, chapterid) {
  for (var i = 0; i < bible.books.length; i++) {
    if (bible.books[i].number === bookid) {
      for (var j = 0; j < bible.books[i].chapters.length; i++) {
        if (bible.books[i].chapters[j].number === chapterid) {
          return bible.books[i].chapters[j].verses
        }
      }
    }
  }
  return null
}
// -------------------------------------------------------------------------------------------------------------
/** Return the Verse Object
 * @param {string} id - The ID of the Book
 * @param {string} chapter - The Nr of the Chapter
 * @param {string} nr - The Nr of the Verse
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getVerse = function (bookid, chapter, nr, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var verse = returnVerse(this.bible, bookid, chapter, nr)
    if (verse === null) {
      callback({status: 404, message: 'No Verse with Number ' + nr + ' in Chapter with Number ' + chapter + 'found in Book with Number ' + bookid + ' found'})
    } else {
      callback(null, verse)
    }
  }
}
/** Sync Return the Verse Object
 * @param {string} id - The ID of the Book
 * @param {string} chapter - The Nr of the Chapter
 * @param {string} nr - The Nr of the Verse
 * @returns {object} - A Verse object
 * */
Bible.prototype.getVerseSync = function (bookid, chapter, nr) {
  return returnVerse(this.bible, bookid, chapter, nr)
}
/** Sync Return the Verse Object
 * @param {object} bible - bible-object
 * @param {string} id - The ID of the Book
 * @param {string} chapter - The Nr of the Chapter
 * @param {string} nr - The Nr of the Verse
 * @returns {object} - A Verse object
 * */
function returnVerse (bible, bookid, chapterid, verseid) {
  for (var i = 0; i < bible.books.length; i++) {
    if (bible.books[i].number === bookid) {
      for (var j = 0; j < bible.books[i].chapters.length; i++) {
        if (bible.books[i].chapters[j].number === chapterid) {
          for (var k = 0; k < bible.books[i].chapters[j].verses.length; k++) {
            if (bible.books[i].chapters[j].verses[k].number === verseid) {
              return bible.books[i].chapters[j].verses[k]
            }
          }
        }
      }
    }
  }
  return null
}
// -------------------------------------------------------------------------------------------------------------
/** Return the Verse Object
 * @param {string} code - The Code of the Verse BOOK-CHAPTER-VERSE
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.getVerseByCode = function (code, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var verse = returnVerseByCode(this.bible, code)
    if (verse === null) {
      callback({status: 404, message: 'No Verse with Code ' + code + ' found'})
    } else {
      callback(null, verse)
    }
  }
}
/** Sync Return the Verse Object
 * @param {string} code - The Code of the Verse BOOKID-CHAPTER-VERSE
 * @returns {object} - A Verse object
 * */
Bible.prototype.getVerseByCodeSync = function (code) {
  return returnVerseByCode(this.bible, code)
}
/** Return the Verse Object
 * @param {object} bible - bible-object
 * @param {string} code - The Code of the Verse BOOKID-CHAPTER-VERSE
 * @returns {object} - A Verse object
 * */
function returnVerseByCode (bible, code) {
  var tmp = code.split('-')
  return returnVerse(bible, tmp[0], tmp[1], tmp[2])
}
// -------------------------------------------------------------------------------------------------------------
/** Return All Verses in the bible matching the text
 * @param {string} text - The Query to search for
 * @param {callback} callback - error-first callback, having the return-data as second parameter
 * */
Bible.prototype.search = function (text, callback) {
  if (typeof callback !== 'function') {
    console.error('No Callback given')
    return null
  } else {
    var verses = returnSearch(this.bible, text)
    if (verses.length < 1) {
      callback({status: 404, message: 'No Verse with Query ' + text + ' found'})
    } else {
      callback(null, verses)
    }
  }
}
/** Sync Return All Verses in the bible matching the text
 * @param {string} text - The Query to search for
 * @returns {array} - An array of verses
 * */
Bible.prototype.searchSync = function (text) {
  return returnSearch(this.bible, text)
}
/** Return All Verses in the bible matching the text
 * @param {object} bible - bible-object
 * @param {string} text - The Query to search for
 * @returns {array} - An array of verses
 * */
function returnSearch (bible, query) {
  var verses = []
  for (var i = 0; i < bible.books.length; i++) {
    for (var j = 0; j < bible.books[i].chapters.length; i++) {
      for (var k = 0; k < bible.books[i].chapters[j].verses.length; k++) {
        if (bible.books[i].chapters[j].verses[k].text.includes(query)) {
          verses.push(bible.books[i].chapters[j].verses[k])
        }
      }
    }
  }
  return verses
}
// -------------------------------------------------------------------------------------------------------------
module.exports = Bible
