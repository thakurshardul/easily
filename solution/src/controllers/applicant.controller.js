import ApplicantsRepository from "../repositories/applicants.repository.js";
import JobsRepository from "../repositories/jobs.repository.js";
import pdfobject from "pdfobject";

import fs from "node:fs"
import path from "node:path";
export default class ApplicantController{
    constructor(){
        this.applicantRepository=new ApplicantsRepository();
        this.jobRepository=new JobsRepository();
    }
    async getApplicants(req,res){
        const id=req.params.id;
        const job=await this.jobRepository.getJobById(id);
        const applicantEmails=job.applicantList;
        const applicantList=await this.applicantRepository.getApplicantByids(applicantEmails,id);
        console.log("applicant LIST:"+applicantList);
        res.render("applicantList",{userId:req.session.userId,role:req.session.role,applicantList:applicantList});
    }
    async getResume(req,res){
        
        // const filename=path.join(path.resolve(),"public","resume",req.params.resumeName);
        // console.log(filename);
        res.send(req.params.resumeName);
        
    }
}