/*
* pre
  * create /tmp/[OBJ]
  * create 10 items in there
* construct
  * correct path
  * wrong path
* list
  * callback
    * items with zero entries
    * items with 1 entry
    * items with some entries
  * return
    * items with zero entries
    * items with 1 entry
    * items with some entries
* get
  * callback
    * no id
    * wrong id
    * correct id
  * return
    * no id
    * wrong id
    * correct id
* getOrCreate
    * no id
    * correct id
    * wrong id (is in database?)
    * no callback
* add
  * no object
  * incorrect source object
  * correct source object
  * already existing source object
  * no callback
  * object emitted
* remove
  * no id
  * wrong id
  * correct id (removed from database?)
  * no callback
  * object emitted
* update
  * no id
  * wrong id
  * correct id (removed from database?)
  * no object
  * incorrect source object
  * correct source object
  * already existing source object
  * no callback
  * object emitted
*/
