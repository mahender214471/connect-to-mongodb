# connect-to-mongodb is a node.js module which allow to perform read ,write , update , detele querys in mongo-DB .

### insallation 

`````````````
npm i connect-to-mongodb
`````````````

### import in your project 

`````````````
const mongo = require('connect-to-mongodb');

`````````````

### call the mongo function whict reture multple methods ;

`````````````
//root directory path of your project 
const rootDir = process.cwd() ;

// mongoDB path on local system ;
const mongoPath = 'mongodb://localhost:27017/mydbname' ;

const db = mongo( rootDir , mongoPath );

`````````````