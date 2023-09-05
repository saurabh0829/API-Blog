// Schema for the Blog
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image: {
        type: String,  // bcoz it iwll be type of a url
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,     // to link user with the blog
        ref:"User",                            // to provide the ref inside the string
        required: true
    }

});

export default mongoose.model("Blog",blogSchema);