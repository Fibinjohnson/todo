import express from "express";
import  {verifyToken} from '../Middleware/auth';
const router=express.Router();
import {getFeedpost,editPost,deletePosts,addPost,changeStatus}  from '../controller/posts';

router.post('/:userId',verifyToken,addPost)
router.get('/:userId',verifyToken,getFeedpost)
router.patch('/:postId/editpost',verifyToken,editPost)
// router.delete('/:postId/deletePost',verifyToken,deletePost)
router.delete('/deletePosts',verifyToken,deletePosts)
router.patch('/:postId/checked',verifyToken,changeStatus)
export default router;