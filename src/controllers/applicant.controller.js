import ApplicantsRepository from "../repositories/applicants.repository.js";
import JobsRepository from "../repositories/jobs.repository.js";
export default class ApplicantController{
    constructor(){
        this.applicantRepository=new ApplicantsRepository();
        this.jobRepository=new JobsRepository();
    }
    async getApplicants(req,res){
        const id=req.params.id;
        const job=await this.jobRepository.getJobById(id);
        const applicantIDS=job.applicantList;
        const applicantList=await this.applicantRepository.getApplicantByids(applicantIDS);
        //console.log(applicantList);
        res.render("applicantList",{applicantList:applicantList});
    }
}