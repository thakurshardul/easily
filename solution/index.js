import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { connectToDB } from "./src/config/mongodb.config.js";

import UserController from "./src/controllers/user.controller.js";
const userController=new UserController();
import JobsController from "./src/controllers/jobs.controller.js";
const jobsController=new JobsController();
import ApplicantController from "./src/controllers/applicant.controller.js";
const applicantController=new ApplicantController();

import {auth} from "./src/middlewares/auth.middleware.js";
import session from "express-session";

import { resumeUpload } from "./src/middlewares/resumeUpload.middleware.js";
import {authorization} from "./src/middlewares/authorized.middleware.js";

const app=express();
app.listen(3200,()=>{
    console.log("server is listening at 3200 port");
    connectToDB();
})

//setting up EJS Views
app.use(expressEjsLayouts);
app.set("view engine","ejs")
app.set("views",path.join(path.resolve(),"src","views"));

app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// setting up express-session
app.use(session({
    secret: '123easily123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

//handle homepage request
app.get("/",(req,res)=>{jobsController.getHomepage(req,res)});
//get all the jobs page view
app.get("/jobs",(req,res)=>{jobsController.getJobsPage(req,res)})
// get login page
app.get("/login",(req,res)=>{userController.getLoginPage(req,res)});
//get register page
app.get("/register",(req,res)=>{userController.getRegistrationPage(req,res)});
//handle login event
app.post("/login",(req,res)=>{userController.loginRecruiter(req,res)});
//handle register event
app.post("/register",(req,res)=>{userController.registerRecruiter(req,res)});
app.get("/viewDetails/:id",(req,res)=>{jobsController.viewDetails(req,res)});
//secure routes
app.get("/newJob",auth,(req,res)=>{jobsController.getNewJob(req,res)});
app.post("/newJob",auth,(req,res)=>{jobsController.postNewJob(req,res)});

app.get("/updatejob/:id", authorization,(req,res)=>{jobsController.getUpdatePage(req,res)})
app.post("/updatejob/:id", authorization,(req,res)=>{jobsController.updateJob(req,res)})

app.get("/deleteJob/:id", authorization,(req,res)=>{jobsController.deleteJob(req,res)});

app.get("/applyJob/:id",auth,(req,res)=>{jobsController.getApplyPage(req,res)})
app.post("/applyjob/:id",auth,resumeUpload.single("resume"),(req,res)=>{jobsController.applyforJob(req,res)})

app.get("/viewApplicants/:id",auth,(req,res)=>{applicantController.getApplicants(req,res)})

app.get("/logout",auth,(req,res)=>{userController.logout(req,res)});

app.get("/search",(req,res)=>{jobsController.searchJob(req,res)});

app.get("/filter",(req,res)=>{
  jobsController.filter(req,res);
})
app.get("/filterJob",(req,res)=>{
  jobsController.filterJobs(req,res);
})

app.get("/getResume/:resumeName",(req,res)=>{
  res.send(req.params.resumeName);
})


