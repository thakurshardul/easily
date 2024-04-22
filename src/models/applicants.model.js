export default class applicantModel{
    static getApplicants(){
        return applicants;
    }
    static getApplicantByid(id){
        const ans=applicants.find(applicant=>applicant.applicantId==id);
        return ans;
    }
    static getApplicantByids(ids){
        const applicantInfo=[];
        for(let ind=0;ind<ids.length;ind++ ){
            applicantInfo.push(applicantModel.getApplicantByid(ids[ind]));
        }
        console.log(applicantInfo);
        return applicantInfo;
        
    }
    static addNewApplicant(name,email,contact,resumePath){
        const newApplicant={
            applicantId:applicants.length+1,
            name:name,
            email:email,
            contact:contact,
            resumePath:resumePath
        }
        applicants.push(newApplicant);

    }
}
const applicants=[
    {
        applicantId:1,
        name:"satyam",
        email:"test1@gmail.com",
        contact:"12345678",
        resumePath:"/resume/resume_4.pdf"
    },
    {
        applicantId:2,
        name:"shivam",
        email:"test1@gmail.com",
        contact:"12345678",
        resumePath:"/resume/resume_4.pdf"
    },
    {
        applicantId:3,
        name:"sundaram",
        email:"test1@gmail.com",
        contact:"12345678",
        resumePath:"/resume/resume_4.pdf"
    },
    {
        applicantId:4,
        name:"rahul",
        email:"test1@gmail.com",
        contact:"12345678",
        resumePath:"/resume/resume_4.pdf"
    },
    {
        applicantId:5,
        name:"rohit",
        email:"test1@gmail.com",
        contact:"12345678",
        resumePath:"/resume/resume_4.pdf"
    }
]