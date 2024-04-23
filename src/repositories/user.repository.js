import { getDB } from "../config/mongodb.config.js";

export default class UserRepository{
    async addNewUser(name,email,password,role){
        const db=await getDB();
        const userCollection=db.collection('users')
        await userCollection.insertOne({name:name,email:email,password:password,role:role})
    }
    async isUserRegistered(email,password){
        const easydb=await getDB();
        const userCollection=easydb.collection('users');
        return await userCollection.findOne({email:email,password:password})
    }
}
