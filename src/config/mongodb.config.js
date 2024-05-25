import { MongoClient } from "mongodb";
const url="mongodb+srv://thakurshardul1:vikram@2607@cluster0.ydkiz5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    return await client.db("easily");
}
