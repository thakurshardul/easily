import { MongoClient } from "mongodb";
const password = encodeURIComponent("Vikram@2607");
const url=`mongodb+srv://sharkkk:${password}@cluster1.0yehnou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/`
let client;
export const connectToDB=async ()=>{
    try{
        client=await MongoClient.connect(url);
        
        console.log("database has successfully been connected")
    }catch(err){
        console.log(err.message);
    }
    
}
export const getDB=async()=>{
    return await client.db("easily");
}
