import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    blogs:[{                                    // an array bcoz an user can have multiple blogs
        type: mongoose.Types.ObjectId,     
        ref: "Blog",
        required: true
    }]   
});

export default mongoose.model("User",userSchema);