import { ObjectId } from "mongodb";
import JobsRepository from "../repositories/jobs.repository.js"
const jobRepository=new JobsRepository();
export async function authorization(req,res,next){
    const jobId=req.params.id;
    const job=await jobRepository.getJobById(jobId);
    if(req.session.userId==job.recruiterId){
        next();
    }
    else{
        res.status(400).send("bad request")
    }

}