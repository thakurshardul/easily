import { getDB } from "../config/mongodb.config.js";
import { ObjectId } from "mongodb";
export default class JobsRepository{
    async getJobs(){
        const db=await getDB();
        const jobsCollection=db.collection("jobs")
        return await jobsCollection.find().toArray();
    }
    async getJobById(id){
        const db=await getDB();
        const jobsCollection=db.collection("jobs")
        return await jobsCollection.findOne({_id:new ObjectId(id)});
    }
    async addNewJob(job,uid){
        const newJob={
        jobCategory:job.jobCategory,
        jobDesignation:job.jobDesignation,
        jobLocation:job.jobLocation,
        companyName:job.company,
        salary:job.salary,
        lastDate:job.lastDate,
        skillsRequired:job.skills,
        openings:job.openings,
        jobPosted:new Date().toISOString().split("T")[0],
        recruiterId:uid,
        applicantList:[],
        applicants:0
        }
        const db=await getDB();
        const jobsCollection=db.collection("jobs")
        await jobsCollection.insertOne(newJob);
    }
    async updateJob(id,newJobData){
        const db=await getDB();
        const jobsCollection=db.collection("jobs")
        await jobsCollection.updateOne({_id:new ObjectId(id)},{$set:{
            jobCategory:newJobData.jobCategory,
            jobDesignation:newJobData.jobDesignation,
            jobLocation:newJobData.jobLocation,
            companyName:newJobData.company,
            salary:newJobData.salary,
            openings:newJobData.openings,
            skillsRequired:newJobData.skills,
            lastDate:newJobData.lastDate,
        }})
    }
    async deleteJob(id){
        const db=await getDB();
        const jobsCollection=db.collection("jobs")
        await jobsCollection.deleteOne({_id:new ObjectId(id)});
    }
    async applicantsOfJob(id,jobId){
        const db=await getDB();
        const jobsCollection=db.collection("jobs")
        await jobsCollection.updateOne({_id:new ObjectId(jobId)},{$push:{applicantList:id},$inc:{applicants:1}}) ;
    }
}