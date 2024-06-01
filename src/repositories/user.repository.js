import { getDB } from "../config/mongodb.config.js";

export default class UserRepository{
    async addNewUser(name,email,password,role){
        const db=await getDB();
        const userCollection=db.collection('users')
        const appliedjobs="";
        await userCollection.insertOne({name:name,email:email,password:password,role:role,jobsApplied:appliedjobs});
    }
    async isUserRegistered(email,password){
        const easydb=await getDB();
        const userCollection=easydb.collection('users');
        return await userCollection.findOne({email:email,password:password})
    }
    async getJobsOfUser(email){
        const easydb=await getDB();
        const userCollection=easydb.collection('users');
        const user= await userCollection.findOne({email:email})
        return user.jobsApplied;
    }
}
