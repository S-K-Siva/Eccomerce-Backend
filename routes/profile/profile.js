import express from "express";
import userModel from "../../models/user.js";
import productModel from "../../models/product.js";

const router = express.Router();

router.post('/createUser',async(req,res) => {
    const {u_name, u_pwd, u_contact, u_email} = req.body;
    if(!u_name || !u_pwd || !u_contact || !u_email){
        res.status(404).json({error : "Missing required fields"});
    }
    const user = await userModel.create({
        u_name:u_name,
        u_pwd :u_pwd,
        u_contact : u_contact,
        u_email : u_email
    });
    res.status(200).json(user);
});

router.get('/getAllUsers',async(req,res)=>{
    const data = await userModel.find({});
    res.status(200).json(data);
});

router.get('/getUser/:id',async(req,res)=>{
    const {id} = req.params;

    const user = await userModel.find({ _id : id});
    
    res.status(200).json(user);
});

router.put('/updateUser/:id',async(req,res) => {
    try{
        const {id} = req.params;
        const {u_name,u_pwd,u_email,u_contact} = req.body;
        if(!u_name || !u_pwd || !u_email || !u_contact){
            res.status(404).json({error:"Missing required fields"});
        }
        const updatedUser = await productModel.findByIdAndUpdate(id,{
            u_name,
            u_pwd,
            u_email,
            u_contact
        },{new : true});
        
        if(!updatedUser){
            res.status(404).json({error:"User not found"});
        }
        res.status(200).json(updatedUser);
    }catch(err){
        console.log(err);
    }
});

router.delete('/deleteUser/:id',async(req,res) => {
    const {id} = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    console.log(deletedUser);
    if(!deletedUser){
        res.status(404).json({error:"User not found"});
    }
    res.status(200).json(deletedUser);
})
export default router;