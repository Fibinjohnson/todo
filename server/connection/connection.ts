import {MongoClient} from 'mongodb';
async function connectToDb(){
    const url=process.env.MONGOURL;
   

    if (!url) {
     console.error('JWT secret key is not defined.');
     process.exit(1);
    }
    const client=new MongoClient(url);
    try{
    await client.connect();
    const database=client.db("TaskTracker");
    return database;
        
    }catch(error){
    console.log("connection,to mongodb error,:",error)
    }
    }
    export {
        connectToDb
    }