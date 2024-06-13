import mongoose from "mongoose"

// product model
const productSchema = new mongoose.Schema({
    p_name : {
        type : String,
        required : true
    },
    p_cost : {
        type : Number,
        required : true 
    },
    p_img : {
        type : String,
        default : "https://newhorizonindia.edu/nhengineering/innovation/wp-content/uploads/2020/01/default-placeholder.png"
    },
    p_cat : {
        type : String,
        required : true
    },
    p_desc : {
        type : String,
    },
    p_created : {
        type : Date,
        default : Date.now()
    }
})

const productModel = mongoose.model('products',productSchema);
export default productModel;