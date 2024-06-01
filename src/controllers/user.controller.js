import UserRepository from "../repositories/user.repository.js";

export default class UserController{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async loginRecruiter(req,res){
        const{email,password}=req.body;
        const user=await this.userRepository.isUserRegistered(email,password);
        if(user){
            req.session.userId=user._id;
            req.session.role=user.role;
            req.session.email=user.email;
            res.redirect("/jobs");
        }
        else{
            res.render("login",{errorMessage:"wrong credentials!!!"})
        }
        
    }
    async registerRecruiter(req,res){
        console.log(req.body);
        const {name,email,password,role}=req.body;
        await this.userRepository.addNewUser(name,email,password,role);
        res.redirect("/login");
    }
    getLoginPage(req,res){
        res.render("login",{errorMessage:null});
    }
    getRegistrationPage(req,res){
        res.render("register")
    }
    logout(req, res) {
        req.session.destroy((err) => {
        if (err) {
        console.log(err);
        } else {
        res.redirect('/');
        }
        });
        
    }
}