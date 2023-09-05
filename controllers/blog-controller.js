import Blog from '../model/Blog';
import User from '../model/User';

export const getAllBlogs = async(req, res, next)=>{
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"Blog not found."})
    }
    return res.status(200).json({blogs})
};

export const addBlog = async(req,res,next)=>{
    const {title, description, image, user} = req.body;

    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
      await blog.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(200).json({blog})
};

export const updateBlog = async(req, res, next)=>{
    const {title, description} = req.body;
    const blogId = req.params.body;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        });
    } catch (err) {
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update the blog"});
    }
    else{
        return res.status(200).json({blog});
    }
};

export const getById = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(404).json({message:"Blog not found"});
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async(req, res, next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id);
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(404).json({message:"Blog not found"});
    }
    return res.status(200).json({message:"Successfully deleted"});
};