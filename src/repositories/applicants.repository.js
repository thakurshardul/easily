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
    async addNewApplicant(name,email,contact,resumePath,jobId,time){
        const db=await getDB();
        const collection=db.collection("applicants");
        const id=await collection.insertOne({
            name:name,
            email:email,
            contact:contact,
            resumePath:resumePath,
            jobsApplied:jobId,
            appliedTime:time
        })
        return email;
        
    }
    async getApplicantByids(applicantIDS,id){
        const db=await getDB();
        const collection=db.collection("applicants");
        let applicantList=[];
        for(let i=0;i<applicantIDS.length;i++){
            const data=await collection.findOne({email:applicantIDS[i],jobsApplied:id})
            if (data){
                applicantList.push(data);
            }
        }
        return applicantList;
        
    }
    async getTime(email,id){
        const db=await getDB();
        const collection=db.collection("applicants");
        const response=await collection.findOne({email:email,jobsApplied:id});
        console.log(response);
        if(response){
            return  response.appliedTime.split("T")[0];
        }
        return null;
        


    }
}