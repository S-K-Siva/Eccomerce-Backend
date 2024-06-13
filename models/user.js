import mongoose from "mongoose";

// user model
const userSchema = new mongoose.Schema({
    u_name : {
        type : String,
        required : true
    },
    u_pwd : {
        type : String,
        required : true
    },
    u_email : {
        type : String,
        required : true
    },
    u_contact : {
        type : Number,
        required : true
    }
});

const userModel = mongoose.model('users',userSchema);
export default userModel;