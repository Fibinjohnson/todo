const express=require("express");
const {connectToDb}=require("../connection/connection");
const { ObjectId } = require("mongodb");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
module.exports.register=async(req,res)=>{
    try{
        console.log(req.body,'req body')
        const {name,
               email,
               password}=req.body
               const saltRounds = 10; 
               const salt = await bcrypt.genSalt(saltRounds);
               const passwordHash = await bcrypt.hash(password, salt);
        const database=await connectToDb();
        const addNewUser=await database.collection('users').insertOne({
            name,
            email,
            password:passwordHash
        })
        res.status(200).json({addNewUser})
    }catch(error){
        res.status(500).json({error:err})
    }

}
module.exports.login=async(req,res)=>{
    try{
        console.log(req.body,"req,body")
        const {
            email,password
        }=req.body;
        const database=await connectToDb();
        const user= await database.collection("users").findOne({email:email});
       
        if(!user){
            console.log("email not found")
           return  res.status(400).json({msg:"Email not found"})
          
        };
        const isMatch= await bcrypt.compare(password,user.password);
        console.log(isMatch,"password match")
        
        if(!isMatch){
            return res.status(200).json({msg:"invalid Password"})
        }else{
            const token=jwt.sign({id:user._id},process.env.SECRETCODEJWT);
            const userWithoutPassword = { ...user, password: undefined };
            res.status(200).json({token,user:userWithoutPassword})
        }
    }catch(err){
        res.status(500).json({error:err})
        console.log("error of this code is:" ,  err)
    }
}
