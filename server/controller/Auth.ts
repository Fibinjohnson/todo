import { Request,Response } from "express";
import {connectToDb} from "../connection/connection";
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken";
export const register=async(req :Request,res:Response)=>{
    try{   
        const {name,
               email,
               password}=req.body
               const saltRounds = 10; 
               const salt = await bcrypt.genSalt(saltRounds);
               const passwordHash = await bcrypt.hash(password, salt);
        const database=await connectToDb();
        const addNewUser=await database?.collection('users').insertOne({
            name,
            email,
            password:passwordHash
        })
        res.status(200).json({addNewUser})
    }catch(err){
        res.status(500).json({error:err})
    }
}
export const login=async(req:Request,res:Response)=>{
    try{
        const {
            email,password
        }=req.body;
        const database=await connectToDb();
        const user= await database?.collection("users").findOne({email:email});
       
        if(!user){
           return  res.status(400).json({msg:"Email not found"}),
           console.log('Email not found')
        };
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(200).json({msg:"invalid Password"}),
            console.log('invalid password')
        }else{
            
            const secretKey = process.env.SECRETCODEJWT;

          if (!secretKey) {
           process.exit(1);
            }
            const token=sign({id:user._id},secretKey);
            const userWithoutPassword = { ...user, password: undefined };
            res.status(200).json({token,user:userWithoutPassword})
        }
    }catch(err){
        res.status(500).json({error:err})
        console.log('error occured in Auth.js login:',err)
    }
}
