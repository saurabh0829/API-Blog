import User from "../model/User";
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err)
    }
    if (!users) {
        return res.status(404).jsom({ message: "No user found" })
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;               //to access the field given 
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exists." })
    }
    // to hash the password
    const hashedPassword = bcrypt.hashSync(password);

    //if the user doesn't exists 
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });

    // to save the new user 
    try {
        await user.save();
    } catch (err) {
        return console.log(err)
    }
    return res.status(201).json({ user });

};
export const login = async(req,res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (!existingUser) {
        return res.status(404).json({ message: "Couldn't find the user by this email id." })
    }
    const isPassword = bcrypt.compareSync(password,existingUser.password);
    if(!isPassword){
        return res.status(400).json({message:"Invalid Password"})
    }
    return res.status(200).json({message:"Login Successfull"});
};



