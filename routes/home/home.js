import express from "express";
import userModel from "../../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).send('<h1>Home Page</h1>');
});

router.post('/login',async(req,res) => {
    const {username, password} = req.body;
    // finding the user with the specific username and password
    let user = await userModel.find({u_name : username, u_pwd : password});
    user = user[0];

    if(user){
        // creating token
        const payload = {
            id : user._id,
            user : user 
        };
        const token = jwt.sign(payload,process.env.MY_SECRET,{ expiresIn : "1hr"});
        console.log(token);
        res.cookie("token",token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production' // ensure secure cookies
        });
        return res.status(200).json({
            jwt_token : token,
            user : user
        });
    }else{
        return res.status(403).json({
            error : "invalid login"
        });
    }
});

router.post('/logout',(req,res) => {
    res.clearCookie('token',{
        httpOnly:true,
        secure : process.env.NODE_ENV === 'production'
    });
    res.status(200).json({message : 'Logout successful'});
})
export default router;