import jobsModel from "../models/jobs.model.js";
import userModel from "../models/users.model.js";
import { resumeUpload } from "../middlewares/resumeUpload.middleware.js";
import vaildateRequest from "../middlewares/validation.middleware.js"
export default class jobsController{
    static getHomepage(req,res){
        //console.log(path.join(path.resolve()))
        res.render("index",{userId:req.session.userId});
    }
    static getJobsPage(req,res){
        const jobs=jobsModel.getJobs();
        res.render("jobs",{jobs:jobs,userId:req.session.userId})
    }
    static getNewJob(req,res){
        res.render("newJob",{userId:req.session.userId});
    }
    //implement to add a new job in jobs model
    static postNewJob(req,res){
        //console.log(req.body);
        jobsModel.addNewJob(req.body,req.session.userId);
        res.redirect("/jobs")
    }
    static viewDetails(req,res){
        const id=req.params.id;
        const job=jobsModel.getJobById(id);
        if(job){
            res.render("viewDetails",{job:job,userId:req.session.userId})
        }
        else{
            res.send("job not found!!!");
        }
    }
    static getApplyPage(req,res){
        const id=req.params.id;
        res.render("applyForJob",{userId:req.session.userId,id:id})
    }
    static applyforJob(req,res){
        const id=req.params.id;
        

    }
    static deleteJob(req,res){
        const id=req.params.id;
        jobsModel.deleteJob(id);
        res.redirect("/jobs");
    }
    static getUpdatePage(req,res){
        const id=req.params.id;
        const job=jobsModel.getJobById(id);
        res.render("updateJob",{userId:req.session.userId,job:job});
    }
    static updateJob(req,res){
        const id=req.params.id;
        const newJobData=req.body;
        console.log(newJobData);
        jobsModel.updateJob(id,newJobData);
        res.redirect("/jobs");
    }
}
