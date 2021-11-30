### CONNECT-TO-MONGODB IS A NODE.JS MODULE (PACKAGE) WHICH MAKE EASY CONNECT WITH MONGO-BD AND PERFORM READ , WRITE , UPDATE , DELETE QUERY IN MOMGO-BD 

### INSTALLATION :-

`````````````
npm i connection-to-mongodb
`````````````

### IMPORT IN YOUR PROJECT : -

`````````````
const mongodb = require('connection-to-mongodb');

`````````````

### INISLIZE THE MODULE :-

`````````````
//root directory path of your project 
const rootDir = process.cwd() ;

// mongoDB path on local system ;
const mongoPath = 'mongodb://localhost:27017/mydbname' ;

const db = mongodb( rootDir , mongoPath );

`````````````

### HOW TO USE :-

`````````````
 After inislize the module run the app 
`````````````
`````````````
 node myapp.js 
`````````````
`````````````
 Now database directory created in root  directory of your app.
 Go to database directory and create new file yourDocument.js and write documet structure 
according to the example  
`````````````
`````````````
// document structure for a contact form 
const contact = () => {
    return {
        // your document structure here ... 
        name:String,
        email:String,
        mobile:String ,
        message:String ,
    }
 }
 module.exports = contact;
`````````````

##### FOR WRITE THE DOCUMENT IN MONGO-BD :-

`````````````
//for write the document ;
const collationName = 'contactForm' ;
const data = {
          name:'name',
          email:'user email id',
          mobile:'user mobile number',
          message:'user massage',
}
const data =  db.Write(collationName , data ) ;
`````````````

##### FOR READ THE DOCUMENT IN MONGO-BD :-

`````````````
//for read the document ;
const collationName = 'contactForm' ;
const filter        = {  name:'name' }
const data =  db.Read(collationName , filter ) ;
`````````````
##### FOR UPDATE THE DOCUMENT IN MONGO-BD :-

`````````````
//for update the document ;
const collationName = 'contactForm' ;
const filter        = {  name:'name' } ;
const updatevalue   = {
                      email:'user new email id',
                      mobile:'user new mobile number',
 }
const data =  db.Update(collationName , filter , updatevalue ) ;
`````````````
##### FOR DELETE THE DOCUMENT IN MONGO-BD :-

`````````````
//for delete the document ;
const collationName = 'contactForm' ;
const filter        = {  name:'name' } ;
const data =  db.Delete(collationName , filter ) ;
`````````````

### EXAMPLE CODE : - 
##### DOCUMENT STRUCTURE FOR THIS EXAMPLE WHICH WRITE IN DATABASE DIRECTORY ( FILE-NAME = contactFrom.js ) : -
````````````````
const contacForm = () => {
             return{
                 name:String,
                 email:String,
                 mobile:String ,
                 message:String ,
             }      
}
module.exports = contacForm ;
````````````````

``````````````
const express = require('express');
const mongo = require('connect-to-mongodb');
const app = express();

//root directory path of your project 
const rootDir = process.cwd() ;
// mongoDB path on local system ;
const mongoPath = 'mongodb://localhost:27017/mydbname' ;
const db = mongo( rootDir , mongoPath );

// for read data from mongodb ;
app.get('/get' , async (req , res) => {
    // read data from database ;
    const filter = { name : "name of uer which you find"}
    const data = await db.Read('contactForm' , filter);
    res.send(data);
});

//for write document in mongodb 
app.get('/write' , async(req ,res) => {
     const UserData = {
         name:'mahender',
         email:'user email id',
         mobile:'user mobile number',
         massage:' hello connect-to-mongodb '
    };

    const Status = await db.Write('contactForm' , UserData);
    res.send(Status);
});

//for update document in mongodb
app.get('/update' , async(req ,res) => {
     const filter = {name:"user name which you update"} ;
     const updatevalue = {  mobile:'user new mobile number', };

   const Status = await db.Update('contactForm' , filter , updatevalue);
   res.send(Status);
});

app.get('/delete' , async(req ,res) => {
    const filter = { name: "user name which your delete"}
    const Status = await db.Delete('contactForm' filter ,});
    res.send(Status);
 });

app.listen(300 , () => {
    console.log('server start at 300')
})
``````````````

______
## FOR MORE INFO CONNECT WITH ME 
#### FACEBOOK   : 
https://www.facebook.com/MJ-Web-Creations-105183487971567/?ref=pages_you_manage
#### INSTAGRAM  :  https://www.instagram.com/mahenderajput1/
#### YOUTUBE    : -
https://www.youtube.com/channel/UCTGDmAfBk7872dIIXy4jQ1w
#### GITHUB     : -
https://github.com/mahender214471/