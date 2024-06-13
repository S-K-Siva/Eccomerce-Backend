import jwt from "jsonwebtoken";
// dotenv used to access env files
import dotenv from "dotenv";
// to access env variables, we need to start the config() method of dotenv.
dotenv.config();
const cookieJwtAuth = (req,res,next) => {
    const token = req.cookies.token;
    try{
        //verifying the jwt token with the secret key
        const user = jwt.verify(token,process.env.MY_SECRET);   
        // setting the current user
        req.user = user;
        next();
    }catch(err){
        // removing the cookie 'token'
        res.clearCookie('token');
        return res.status(201).json({error : "User is Unauthorised"});
    }
}

export default cookieJwtAuth;