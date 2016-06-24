# MyVerses
Simple Service to Read the Bible and have a list of favorite bible verses.

## Start the App

### OneLiner
1. `wget https://raw.githubusercontent.com/WebDaD/myVerses/master/install.sh | sh`

### Native
1. `git clone https://github.com/WebDaD/myVerses.git`
2. `cd myVerses`
3. `npm run deploy`
4. `npm start`

### Docker
1. `git clone https://github.com/WebDaD/myVerses.git`
2. `cd myVerses`
3. `mkdir -p /usr/database/myVerses`
3. `docker build -t myVerses .`
4. `docker run -v /usr/database/myVerses:/opt/myVerses/database myVerses`

## Resources
Many Thanks to the developers of the Following Stuff:
* [Zefaina](https://sourceforge.net/projects/zefania-sharp/ http://bgfdb.de/zefaniaxml/bml/)
* [Bootstrap](http://getbootstrap.com/)
* [Angular](https://angularjs.org/)
* [node.js](https://nodejs.org/en/)
* [passportjs](http://passportjs.org/)
* [MaterialPalette](https://www.materialpalette.com/green/amber)
* [AndroidAssetStudio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
* [RealFaviconGenerator](http://realfavicongenerator.net/)
* [TWBSColor](http://work.smarchal.com/twbscolor/)

---
Below this line, stuff will be removed and placed in better places!
### TODO

## code
* libs
  * user + optional callbacks
  * bible + optional callbacks
  * bibles + optional callbacks
* Routes
  * bible (req.query.version,language)
  * stats
  * user
* tests
  * bible
  * bibles
  * user
* assets / gui
  * global
    * typhography
    * nice header
    * print button in navbar, on card(fullscreen, sideways)
    * search in upper right
  * html
    * bible
    * TEST Home
    * Login
    * modal-verse
    * Profile
    * stats
    * verse
  * angularjs
    * MyVerses
    * services
      * bible
      * stats
      * user
    * controller
      * bible
      * Home
      * Login
      * modal-verse
      * Profile
      * stats
      * verse

## Installer
* apt-get git node npm
* set link if needed
* deploy

## docs
* standard icon in readme, also test coverage, etc
* logo on readme top
* raml
* postman

## Backend
* Export Verse, Chapters, myVerses, Book, Bible
  * route /export/:code/?:userid.:extension
  * xml, csv, xls, pdf, html, json

## Login-Options
* local (bcrypt, md5)
* facebook
* twitter
* google
* linkedIN
* OpenID
