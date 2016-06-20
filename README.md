# MyVerses
Simple Service to Read the Bible and have a list of favorite bible verses.

## Uses
* Zefaina https://sourceforge.net/projects/zefania-sharp/
* Bootstrap
* Angular
* node.js
* passportjs http://passportjs.org/
* Filebases Database

## Screens
* Home (CardList of my Verses (like google keep), Add-Button, Share Verse)
* Modal Add Verse (From, to, searchlike interface)
* Login (if not logged in)
* Bible (Bible-Text, Selector)
* Profile (User-Data)

## Login-Options
* local (bcrypt, md5)
* facebook
* twitter
* google
* linkedIN
* OpenID

## User-Data
* ID
* Name
* Surname
* Login
* Nickname
* E-Mail
* login-method
* password
* Afray of bible verse codes
* Language
* bible-version
(image via gravatar)

## Backend
* XML-Bibles
* Json with languages, versions
* JSON-Bibles (converted on Start)
* Routes to display text

### extensions
* html (standalone)
* json (text and link and navigation (up, down, prev, next))
* XML
* txt (simple text)

### Routes
possible query: ?lang=&version=
* /api/:code.:extension (code: eg gen1,3)
* /api/:book.:extension
* /api/:book/chapters.:extension
* /api/:book/:chapter.:extension
* /api/:book/:chapter/verses.:extension
* /api/:book/:chapter/:verse.:extension
* /api/languages.:extension
* /api/versions.:extension
* /api/user/:id.json
* /login
* /register
* /home
* /bible
* /profile
