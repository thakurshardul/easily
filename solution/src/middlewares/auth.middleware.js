export function auth(req,res,next){
    if(req.session.userId){
        next();
    }
    else{
        res.redirect("/login");
    }
}