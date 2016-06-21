# MyVerses
Simple Service to Read the Bible and have a list of favorite bible verses.

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

## Design
* header (scroll away)
* have good typography
* round buttons: <button type="button" class="btn btn-lg btn-primary btn-circle"><i class="glyphicon glyphicon-plus"></i></button>

## Screens
* Home (CardList of my Verses (like google keep), Add-Button, Share Verse)
* Modal Add Verse (From, to, searchlike interface)
* Login (if not logged in) +register, forgotPWD
* Bible (Bible-Text, Selector)
* Profile (User-Data)

## Login-Options
* local (bcrypt, md5)
* facebook
* twitter
* google
* linkedIN
* OpenID


## Backend
* XML-Bibles
* (mem)Json with languages, versions
* (mem)JSON-Bibles (converted on Start)
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
* /favicon.ico -> images/favicon
