import { MongoClient } from "mongodb";
const url="mongodb://127.0.0.1:27017/easily"

export const connectToDB=async ()=>{
    try{
        const client=await MongoClient.connect(url);
        console.log("database has successfully been connected")
    }catch(err){
        console.log(err.message);
    }
    
}