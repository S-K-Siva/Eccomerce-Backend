import express from "express";
import productModel from "../../models/product.js";
const router = express.Router();


router.get('/allProducts',async(req,res) => {
    const data = await productModel.find({});
    console.log("data is : ",data);
    res.json(data).status(200);
});

router.post('/createProduct', async(req,res) => {
    try{
    const p_name = req.body['p_name'];
    const p_cost = req.body['p_cost'];
    const p_img = req.body['p_img'];
    const p_desc = req.body['p_desc'];
    const p_cat = req.body['p_cat'];
    
    if(!p_name || !p_cost || !p_desc || !p_cat){
        res.status(400).json({
            "error":"Missing required fields"
        })
    }
    else{
    const product = await productModel.create({
        p_name : p_name,
        p_cost : p_cost,
        p_cat : p_cat,
        p_img : p_img,
        p_desc : p_desc
    });

    res.status(200).json({
        data:product
    });
}
    }

    catch(err){
        console.log(err);
    res.status(200).json({
        error:err

    })
}
})

router.get('/getProduct/:id',async(req,res)=>{
    const {id} = req.params;
    console.log("id is ",id);
    try{
        const product = await productModel.find({_id : id});
        if(product){
            res.status(200).json(product);
        }else{
            res.status(200).json({
                detail : "Product not found"
            })
        }
    }
    catch(err){
        res.status(404).json({
            error : "Something went wrong!"
        })
    }
});

router.put('/updateProduct/:id',async(req,res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const {p_name,p_cat,p_desc,p_cost,p_img} = req.body;
        if(!p_name || !p_cat || !p_desc || !p_cost || !p_img){
            res.send(400).json({error : "Missing required fields"});
        }
        const product = await productModel.findByIdAndUpdate(id,{
            p_name,
            p_cat,
            p_desc,
            p_cost,
            p_img
        },{new:true});
        // console.log("updated product : ",product._update);
        if(!product){
            res.status(400).json({error:"Product not updated!"});
        }
        res.status(200).json({data:product});
    }catch(err){
        res.status(404).json({error:"Something went wrong!"});
    }
})

router.delete('/deleteProduct/:id',async(req,res) => {
    const {id} = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if(!deletedProduct){
        res.status(404).json({error : "Product not found"});
    }
    res.status(200).json(deletedProduct);
})

export default router;