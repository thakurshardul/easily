
import userModel from "../models/users.model.js"
export default class userController{
    static loginRecruiter(req,res){
        const{email,password}=req.body;
        const user=userModel.isUserRegistered(email,password);
        if(user){
            req.session.userId=user.userId;
            res.redirect("/jobs");
        }
        else{
            res.render("login",{errorMessage:"wrong credentials!!!"})
        }
        
    }
    static registerRecruiter(req,res){
        const {name,email,password}=req.body;
        userModel.addNewUser(name,email,password);
        res.redirect("/login");
    }
    static getLoginPage(req,res){
        res.render("login",{errorMessage:null});
    }
    static getRegistrationPage(req,res){
        res.render("register")
    }
    static logout(req, res) {
        req.session.destroy((err) => {
        if (err) {
        console.log(err);
        } else {
        res.redirect('/');
        }
        });
        
    }
}