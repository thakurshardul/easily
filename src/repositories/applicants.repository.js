import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.config.js";

export default class ApplicantsRepository{
    async getApplicants(){
        const db=await getDB();
        const collection=db.collection("applicants");
        return await collection.find().toArray(); 
    }
    async getApplicantByid(id){
        const db=await getDB();
        const collection=db.collection("applicants");
        return await collection.findOne({_id:new ObjectId(id)});
    }
    async addNewApplicant(name,email,contact,resumePath){
        const db=await getDB();
        const collection=db.collection("applicants");
        const id=await collection.insertOne({
            name:name,
            email:email,
            contact:contact,
            resumePath:resumePath
        })
        return id.insertedId;
        
    }
    async getApplicantByids(applicantIDS){
        const db=await getDB();
        const collection=db.collection("applicants");
        let applicantList=[];
        for(let id=0;id<applicantIDS.length;id++){
            applicantList.push(await collection.findOne({_id:new ObjectId(applicantIDS[id])}))
        }
        return applicantList;
        
    }
}