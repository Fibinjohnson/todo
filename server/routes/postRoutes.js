const express=require("express");

const router=express.Router();
const {editPost,deletePost,addPost} =require('../controller/posts')

module.exports=router;