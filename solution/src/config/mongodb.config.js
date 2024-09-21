import { MongoClient } from "mongodb";
const url="mongodb://127.0.0.1:27017/easily"
let client;
export const connectToDB=async ()=>{
    try{
        client=await MongoClient.connect(url);
        //console.log(client)
        console.log("database has successfully been connected")
    }catch(err){
        console.log(err.message);
    }
    
}
export const getDB=async()=>{
    return await client.db();
}
