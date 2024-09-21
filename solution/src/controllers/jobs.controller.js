import ApplicantsRepository from "../repositories/applicants.repository.js";
const applicantRepository=new ApplicantsRepository();
import JobsRepository from "../repositories/jobs.repository.js";
import { resumeUpload } from "../middlewares/resumeUpload.middleware.js";
import vaildateRequest from "../middlewares/validation.middleware.js"
import { ObjectId } from "mongodb";
import UserRepository from "../repositories/user.repository.js";
const userRepository=new UserRepository();
import path from "node:path"

export default class JobsController{
    constructor(){
        this.jobRepository=new JobsRepository();
    }
    getHomepage(req,res){
        //console.log(path.join(path.resolve()))
        res.render("index",{userId:req.session.userId,role:req.session.role});
    }
    async getJobsPage(req,res){
        const jobs=await this.jobRepository.getJobs();
        //console.log("user id is "+req.session.userId)
        res.render("jobs",{jobs:jobs,userId:req.session.userId,role:req.session.role})
    }
    getNewJob(req,res){
        if(req.session.role=="recruiter"){
            res.render("newJob",{userId:req.session.userId,role:req.session.role});
        }
        else{
            res.status(400).send("bad request");
        }
        
    }
    //implement to add a new job in jobs model
    async postNewJob(req,res){
        //console.log(req.body);
        if(req.session.role=="recruiter"){
            await this.jobRepository.addNewJob(req.body,req.session.userId);
            res.redirect("/jobs")
        }else{
            res.status(400).send("bad request");
        }
        
    }
    async viewDetails(req,res){
        const id=req.params.id;
        const job=await this.jobRepository.getJobById(id);
        const email=req.session.email;
       
        const applicants=job.applicantList;
        let isAlreadyapplied;
        if(applicants){
            isAlreadyapplied=applicants.find((applicant)=>applicant==email);
        }
        const time=await applicantRepository.getTime(email,id);
        console.log(time);

        
        
        if(job&&isAlreadyapplied){
            res.render("viewDetails",{job:job,userId:req.session.userId,role:req.session.role,applied:isAlreadyapplied,time:time||null});
        }else if(job&&  !isAlreadyapplied){
            res.render("viewDetails",{job:job,userId:req.session.userId,role:req.session.role,applied:null,time:time||null});
        }
        else{
            res.send("job not found!!!");
        }
    }
    getApplyPage(req,res){
        const id=req.params.id;
        res.render("applyForJob",{userId:req.session.userId,id:id,role:req.session.role})
    }
    async applyforJob(req,res){
        const id=req.params.id;
        const {name,email,contact}=req.body;
        //const resumePath="/resume/"+req.file.filename;
        const resumePath=req.file.filename
        const emailReturned=await applicantRepository.addNewApplicant(name,email,contact,resumePath,id,new Date().toISOString());
        await this.jobRepository.applicantsOfJob(emailReturned,id);
        
        res.redirect("/jobs");
    }
    async searchJob(req,res){
        const {input} =req.query;
        const jobs=await this.jobRepository.getJobByName(input);
        // console.log(jobs);
        res.render("jobs",{jobs:jobs,userId:req.session.userId,role:req.session.role})

    }
    async deleteJob(req,res){
        const id=req.params.id;
        await this.jobRepository.deleteJob(id);
        res.redirect("/jobs");
    }
    async getUpdatePage(req,res){
        const id=req.params.id;
        const job=await this.jobRepository.getJobById(id);
        res.render("updateJob",{userId:req.session.userId,role:req.session.role,job:job});
    }
    async updateJob(req,res){
        const id=req.params.id;
        const newJobData=req.body;
        //console.log(newJobData);
        await this.jobRepository.updateJob(id,newJobData);
        res.redirect("/jobs");
    }
    filter(req,res){
        res.render("fiilter");
    }
    async filterJobs(req,res){
        const {jobLocation,skills}=req.query;
        const filteredJobs=await this.jobRepository.filter(jobLocation,skills);
        res.render("jobs",{userId:req.session.userId,role:req.session.role,jobs:filteredJobs});
        
        
    }
}
