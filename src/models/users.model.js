
export default class userModel{
    static addNewUser(name,email,password){
        const newUser={
            userId:users.length+1,
            name:name,
            email:email,
            password:password,
            role:"recruiter"
        }
        users.push(newUser);
    }
    static isUserRegistered(email,password){
        const user=users.find(user=>user.email==email&&user.password==password);
        return user;
    }
}
const users=
[
    {
        userId:1,
        name:"shardul",
        email:"thakurshardul1@gmail.com",
        password:"qwerty@6789",
        role:"recruiter"
    },
];