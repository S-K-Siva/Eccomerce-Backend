import express from "express";
import cartModel from "../../models/cart.js";
const router = express.Router();


router.post('/addToCart',async(req,res) => {
    const u_id = req.user.id;
    const {p_name,p_cost,p_img,p_desc,p_cat} = req.body;

    const newCartProduct = await cartModel.create({
        u_id : u_id,
        p_name : p_name,
        p_cat : p_cat,
        p_desc : p_desc,
        p_cost : p_cost,
        p_img : p_img
    });

    return res.status(200).json(newCartProduct);
});

router.get('/getCarts',async(req,res)=>{
    const data = await cartModel.find({});
    return res.status(200).json(data);
});

router.get('/getMyCart',async(req,res)=>{
    const data = await cartModel.find({u_id : req.user.id});
    return res.status(200).json(data);
});

router.patch('/updateCart/:id',async(req,res) => {
    const {id} = req.params;
    const updatedCartProduct = await cartModel.findByIdAndUpdate(id,req.body);
    if(!updatedCartProduct) return res.status(400).json({error:"Error occurred while updating the cart"});
    res.status(200).json({error:"The cart is updated!"});
});

router.delete('/deleteCart/:id',async(req,res) => {
    const {id} = req.params;
    await cartModel.deleteOne({_id:id});
    res.status(200).json({message : "Item deleted from the cart successfully!"});
});

export default router;