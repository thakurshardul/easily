import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { connectToDB } from "./src/config/mongodb.config.js";
import userController from "./src/controllers/user.controller.js";
import jobsController from "./src/controllers/jobs.controller.js";
import {auth} from "./src/middlewares/auth.middleware.js";
import session from "express-session";
import { resumeUpload } from "./src/middlewares/resumeUpload.middleware.js";
import applicantController from "./src/controllers/applicant.controller.js";

const app=express();
app.listen(3200,()=>{
    console.log("server is listening at 3200 port");
    connectToDB();
})


app.use(expressEjsLayouts);
app.set("view engine","ejs")
app.set("views",path.join(path.resolve(),"src","views"));

app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// setting up express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

//handle homepage request
app.get("/",jobsController.getHomepage);
//get all the jobs page view
app.get("/jobs",jobsController.getJobsPage)
// get login page
app.get("/login",userController.getLoginPage);
//get register page
app.get("/register",userController.getRegistrationPage);
//handle login event
app.post("/login",userController.loginRecruiter,auth,jobsController.getJobsPage);
//handle register event
app.post("/register",userController.registerRecruiter);
app.get("/viewDetails/:id",jobsController.viewDetails);

app.get("/newJob",auth,jobsController.getNewJob);
app.post("/newJob",auth,jobsController.postNewJob);
app.get("/updatejob/:id",auth,jobsController.getUpdatePage)
app.post("/updatejob/:id",auth,jobsController.updateJob)
app.get("/deleteJob/:id",auth,jobsController.deleteJob);
app.get("/applyJob/:id",jobsController.getApplyPage)
app.post("/applyjob/:id",resumeUpload.single("resume"),jobsController.applyforJob)
app.get("/viewApplicants/:id",applicantController.getApplicants)
app.get("/logout",auth,userController.logout);



