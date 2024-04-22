export default class jobsModel{
    static getJobs(){
        return jobs;
    }
    static getJobById(id){
        return jobs.find(job=>job.jobId==id);
    }
    static addNewJob(job,uid){
        let jobId;
        if(jobs.length>0){
            jobId=jobs[jobs.length-1].jobId+1;
        }
        else{
            jobId=jobs.length+1;
        }
        const newJob={
        jobId:jobId,
        jobCategory:job.jobCategory,
        jobDesignation:job.jobDesignation,
        jobLocation:job.jobLocation,
        companyName:job.company,
        salary:job.salary,
        lastDate:job.lastDate,
        skillsRequired:job.skills,
        openings:job.openings,
        jobPosted:Date.now().toString(),
        recruiterId:uid,
        applicantList:[],
        applicants:0
        }
        console.log(newJob);
        jobs.push(newJob);
    }
    static updateJob(id,newJobData){
        const job=jobs.find(job=>job.jobId==id);
        if(job){
            job.jobCategory=newJobData.jobCategory;
            job.jobDesignation=newJobData.jobDesignation;
            job.jobLocation=newJobData.jobLocation;
            job.companyName=newJobData.company;
            job.salary=newJobData.salary;
            job.openings=newJobData.openings;
            job.skillsRequired=newJobData.skills;
            job.lastDate=newJobData.lastDate;
        }
        else{
            return job;
        }
    }
    static deleteJob(id){
        const jobIndex=jobs.findIndex(job=>job.jobId==id);
        if(jobIndex>=0){
            jobs.splice(jobIndex,1);
        }
        else{
            res.send("job not found");
        }
        
    }
}
const jobs=[
    {
        jobId:1,
        jobCategory:"Tech",
        jobDesignation:"SDE",
        jobLocation:"gurgao HR IND",
        companyName:"codingNinjas",
        salary:"14-16 lakhs",
        lastDate:"2024-04-04",
        skillsRequired:["react","express","aws","docker","html","css","javascript"],
        openings:3,
        jobPosted:"2024-03-25",
        applicants:4,
        applicantList:[1,2,3,4],
        recruiterId:"1",
    },
    {
        jobId:2,
        jobCategory:"Non Tech",
        jobDesignation:"HR",
        jobLocation:"Noida IND",
        companyName:"Avantador",
        salary:"10-12 lakhs",
        lastDate:"3/4/2024",
        skillsRequired:["communication skills","leadership","negotiation skills"],
        openings:2,
        jobPosted:"25/3/2024",
        applicants:3,
        applicantList:[1,3,4],
        recruiterId:"1",
    },
    {
        jobId:3,
        jobCategory:"Tech",
        jobDesignation:"SDE",
        jobLocation:"gurgao HR IND",
        companyName:"Unacademy",
        salary:"7-10 lakhs",
        lastDate:"6/4/2024",
        skillsRequired:["react","express","aws","docker","html","css","javascript","cloud"],
        openings:5,
        jobPosted:"25/3/2024",
        applicants:2,
        applicantList:[2,3],
        recruiterId:"1",
    }
]