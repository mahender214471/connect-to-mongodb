/*
//=====================> ABOUT FILE <==========================//
MOTIVE - FILE FOR WRITE CODE FOR PERFORME OPRATIONS ON MONGODB ;
WRITER - MAHENDER RAJPUT ;
*/
//SUB HALPING MODULES ;
const fs = require("fs");
const path = require('path');
const mongoose = require("mongoose");

class database {
  // constructor FOR DICLAYER GLOBAL VARIABLE OT THIS CLASS ;
  constructor( rootDir , mongoDBPath ) {
            this.mongoose    = require('mongoose');
            this.rootDir     = rootDir ;
            this.mongoDBPath = mongoDBPath ;
            //CONNECT APP WITH MONGO-DB ;
            this. ConnectWithMongo();
            //create datbase folder in root Dir ;
            this.CreateDir();
            console.log('DATABASE CREATED SUSESFULLY ');
            this.db = this.GenerateCollections();
            console.log(`collections = > `);
            console.log(this.db.collectionsConf);
  }
  
  //METHOD FOR CONNECT APP WITH MONGO DB ;
  ConnectWithMongo(){
    this.mongoose.connect(this.mongoDBPath, {
        useNewUrlParser: true // Boilerplate for Mongoose 5.x
      }).then(()=>{
          console.log(`APP SUSESFULLY CONNECT WITH MONGO DB DATABASE `);
    })
  }

  //METHOD FOR CREATE DATABASE FOLDER AND SAMPLE.JS FILE IN DATABASE FOLDER ;
  CreateDir () {
      try{
        fs.mkdir(`${this.rootDir}/database` , (err , data) => {
          // WHEN DIRECTORY NOT CREATED ;
          if(err){
 
          }
          // WHEN DIRECTORY  CREATED ;
          else{
               // CREATE SAMPLE.JS FILE IN DATABASE FOLDER ;
               const sampleFile = fs.readFileSync(path.join(__dirname , `sample.txt`) , 'utf8');
               fs.writeFileSync(`${this.rootDir}/database/sample.js` , sampleFile );
          }
        });
      }
      catch(e){
          console.log(`failed to create databasa direcory in root dir `);
          console.log(e);
      }
  }

  //METHOD FOR GENERATE COLLECTION ON MONGO-DB DATABASE ;
  GenerateCollections () {
      try{
        let database  = { collections:[] , collectionsConf:[] };
        const files = fs.readdirSync(`${this.rootDir}/database` , 'utf-8');
         //FITER THE FILES NAME PRESEN IN DATABASE FOLDER ;
         for (let i = 0; i < files.length; i++) {
            const File = files[i];
            const FileName = File.split('.');
            database.collectionsConf.push(FileName[0]);                  
        } 
    
        //GENERATING THE MODELS OF MONGOOSE  OR COLLECTIONS ;
        for (let i = 0; i < files .length; i++) {
           const fileName = files [i];
           const DocumentStructure = require(`${this.rootDir}/database/${fileName}`)();
           const Schema = mongoose.Schema(DocumentStructure);
           const model = mongoose.model( database.collectionsConf[i] , DocumentStructure );
           database.collections.push(model);
        }
        return database  ;
     }
     catch(e){
         console.log('error database dir.. not present in root dir..')
         console.log(e);
     }
  }
  //METHOD FOR FIND COLLATION NAME OR COLLATION ;
  FindCollation(db , collation){
    const collections = db.collectionsConf ;
    for (let i = 0; i <  collections.length; i++) {
        const collationName =  collections[i];
        if( collationName === collation ){
            return i ;
        }
        if(i=== (collections.length-1)){
            return false ;
        }
    }
 }
 
 // METHOD FOR WRITE DATA IN MONGO-DB DATABASE ;
 async Write(collationName , data ){
     try {
       const collection = this.FindCollation(this.db , collationName );
       if(collection === false ){
         return `invalid collaton name `;
       }
       else{
         const NewDoc = new this.db.collections[collection] (data);
         const Status = await NewDoc.save();
         return Status;
       }
     }
     catch(e){
       return e ;
     }
 }

 //METHOD FOR READ DATA FROM MONGO-DB DATABASE ;
 async Read(collationName , filter){
      try {
        const collection = this.FindCollation(this.db , collationName );
        if(collection === false ){
          return `invalid collaton name `;
        }
        else{
          const data = await this.db.collections[collection].find(filter);
          return data ;
        }
      }
      catch(e){
        return e ;
      }
  }

  //METHOD FOR UPDATE DATA IN MONGO-DB DATABASE ;
  async Update(collationName , filter , updateValue ){
    try {
      const collection = this.FindCollation(this.db , collationName );
      if(collection === false ){
        return `invalid collaton name `;
      }
      else{
        const data = await this.db.collections[collection].update(filter , { $set:updateValue });
        return data;
      }
    }
    catch(e){
      return e ;
    }
 }

  //METHOD FOR UPDATE DATA IN MONGO-DB DATABASE ;
  async Delete(collationName , filter){
    try {
      const collection = this.FindCollation(this.db , collationName );
      if(collection === false ){
        return `invalid collaton name `;
      }
      else{
        const data = await this.db.collections[collection].deleteOne(filter);
        return data;
      }
    }
    catch(e){
      return e ;
    }
}
}
module.exports = database;
