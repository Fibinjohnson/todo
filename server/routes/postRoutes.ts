import express from "express";
import  {verifyToken} from '../Middleware/auth';
const router=express.Router();
import {getFeedpost,editPost,deletePost,addPost,changeStatus}  from '../controller/posts';

router.post('/:userId',verifyToken,addPost)
router.get('/:userId',verifyToken,getFeedpost)
router.patch('/:postId/editpost',verifyToken,editPost)
router.delete('/:postId/deletePost',verifyToken,deletePost)
router.patch('/:postId/checked',verifyToken,changeStatus)
export default router;