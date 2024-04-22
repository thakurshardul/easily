export default class vaildateRequest{
    static isApplicantAllowedToApply(req,res,next){
        //if applicant is itself the one who posted the job we should convey that u cant apply for the jobs that u posted urself and return
        //else next validation check
    }
    static isUserAlreadyRegistered(req,res,next){
        //check if that email adress is already registered for that particular job and if it is so relay that as errormessage and return
        //else next validation check
    } 
    static allFormFieldsValid(req,res,next){
        //check if every every field value is value and if not relay that as errorMessage and return
        //else pass
        const {name, email, contact}=req.body;
        const resumeDoc=req.file.fileName;
        console.log(name,email,contact,resumeDoc);
    } 
}