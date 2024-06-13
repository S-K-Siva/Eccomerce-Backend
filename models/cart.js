import mongoose from "mongoose";
// cart Model
const cartSchema  = new mongoose.Schema({
    u_id : {
        type : String,
        required : true
    },
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
    }
});
const cartModel = mongoose.model('carts',cartSchema);

export default cartModel;