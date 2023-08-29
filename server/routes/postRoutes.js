const express=require("express");
const  {verifyToken}=require('../Middleware/auth')
const router=express.Router();
const {getFeedpost,editPost,deletePost,addPost,changeStatus} =require('../controller/posts')

router.post('/:userId',verifyToken,addPost)
router.get('/:userId',verifyToken,getFeedpost)
router.patch('/:postId/editpost',verifyToken,editPost)
router.delete('/:postId/deletePost/:userId',verifyToken,deletePost)
router.patch('/:postId/checked',verifyToken,changeStatus)
module.exports=router;