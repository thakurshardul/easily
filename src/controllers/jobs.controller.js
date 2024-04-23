import ApplicantsRepository from "../repositories/applicants.repository.js";
const applicantRepository=new ApplicantsRepository();
import JobsRepository from "../repositories/jobs.repository.js";
import { resumeUpload } from "../middlewares/resumeUpload.middleware.js";
import vaildateRequest from "../middlewares/validation.middleware.js"
import { ObjectId } from "mongodb";
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
        if(job){
            res.render("viewDetails",{job:job,userId:req.session.userId,role:req.session.role})
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
        //console.log(req.file.path);
        const resumePath="/resume/"+req.file.filename;
        const idReturned=await applicantRepository.addNewApplicant(name,email,contact,resumePath);
        await this.jobRepository.applicantsOfJob(idReturned,id);
        res.redirect("/jobs");



        
        

    }
    async deleteJob(req,res){
        const id=req.params.id;
        await this.jobRepository.deleteJob(id);
        res.redirect("/jobs");
    }
    async getUpdatePage(req,res){
        const id=req.params.id;
        const job=await this.jobRepository.getJobById(id);
        res.render("updateJob",{userId:req.session.userId,job:job});
    }
    async updateJob(req,res){
        const id=req.params.id;
        const newJobData=req.body;
        //console.log(newJobData);
        await this.jobRepository.updateJob(id,newJobData);
        res.redirect("/jobs");
    }
}
