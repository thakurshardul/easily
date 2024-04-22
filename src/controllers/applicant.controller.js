import applicantModel from "../models/applicants.model.js";
import jobsModel from "../models/jobs.model.js";
export default class applicantController{
    static getApplicants(req,res,next){
        const id=req.params.id;
        const job=jobsModel.getJobById(id);
        const applicants=job.applicantList;
        const applicantList=applicantModel.getApplicantByids(applicants);
        console.log(applicantList);
        res.render("applicantList",{applicantList:applicantList});

    }
}