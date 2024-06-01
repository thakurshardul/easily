import ApplicantsRepository from "../repositories/applicants.repository.js";
import JobsRepository from "../repositories/jobs.repository.js";
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
        
        const { filename } = req.params;
        console.log("filename: "+filename);
        const filePath=path.join(path.resolve(),"public","resume",filename)
        console.log("filePath: "+filePath);

    // Check if file exists
    if (fs.existsSync(filePath)) {
        // Set Content-Disposition header to inline
        res.setHeader('Content-Disposition', 'inline; filename=' + filename);
        // Set Content-Type header to PDF
        res.setHeader('Content-Type', 'application/pdf');
        // Stream the file
        fs.createReadStream(filePath).pipe(res);
        console.log("if condition triggered")
    } else {
        // File not found
        res.status(404).send('File not found');
    }
    }
}