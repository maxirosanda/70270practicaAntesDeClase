import { usersService } from "../services/index.js"
import __dirname  from "../utils/index.js";

const getAllUsers = async(req,res)=>{
   try{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
   }
    catch(err){
         res.status(500).send({status:"error",error:err.message})
    }
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const addDocuments = async(req,res) =>{
    const files = req.files;
    const userId = req.params.uid;

    const documents = files.map(file => ({
        name:file.filename,
        reference:`${__dirname}/../public/img/${file.filename}`
    }));
    const result = await usersService.saveDocuments(userId, documents);
    res.send({status:"success",payload:result})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    addDocuments
}