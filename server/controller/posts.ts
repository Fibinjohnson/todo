import {connectToDb}from "../connection/connection";
import { ObjectId } from "mongodb";
import { Request,Response } from "express";


export const addPost=async(req :Request,res:Response)=>{
  try{
    const {title,content,completed}=req.body
    const {userId}=req.params
    const database =await connectToDb();
    if(!database){
      console.log('error occured')
    }else{
      const addedPost=await database.collection('posts').insertOne({
        title,
        content,
        user:new ObjectId(userId),
        completed
   })
   res.status(200).json(addedPost);
    }
    
  }catch(error){
    console.error('Error occured on adding:', error);
    res.status(500).json({ message: 'Error occured on adding' });
  }
   
}
export const deletePosts=async(req:Request,res:Response)=>{
  try{
    console.log("caleedddddddddddddddd")
     const db= await connectToDb();
     const {postId}=req.params;
    const {userId , posts}=req.body ; 

    console.log(posts,"caleedddddddddddddddd")

    console.log(posts)
    if(!db){
      console.log('posts error')
    }else{

      const collection = db.collection("posts");

      //  await db.collection('posts').deleteOne({_id:new ObjectId(postId)})
      // const newPosts= await db.collection('posts').find({user:new ObjectId(userId)}).toArray()

      const objectIdsToDelete = posts.map((id:any) => new ObjectId(id));

      // Delete documents with the specified IDs
      await collection.deleteMany({ _id: { $in: objectIdsToDelete } });
  
      // Find remaining documents
      const newPosts = await collection.find().toArray();
       res.status(200).json(newPosts);
    }  
  }catch(error){
    console.log(error)
    res.status(500).json({ message: 'Error occured on deleting' });
  }
}
export const editPost=async(req:Request,res:Response)=>{
   try{
     const db=await connectToDb();
     const {postId}=req.params;
     const {title,content,completed}=req.body
     if(db){
      await db.collection('posts').updateOne(
        { _id: new ObjectId(postId) },
        {
          $set: {
            title: title, 
            content: content, 
            completed: completed 
          }
        }
      );
        const editedPost=await db.collection('posts').findOne({_id:new ObjectId(postId)});
        res.status(200).json(editedPost);
     }
    
      
   }catch(error){
   console.error('Error occured on editing:', error);
   res.status(500).json({ message: 'Error occured on editing' });
 }

}
export const getFeedpost = async (req:Request, res:Response) => {
    try {
      const { userId } = req.params;
      const db = await connectToDb();
      const feedPosts = await db?.collection('posts').find({ user: new ObjectId(userId) }).toArray();
      res.status(200).json(feedPosts);
    } catch (error) {
      console.error('Error fetching feed posts:', error);
      res.status(500).json({ message: 'An error occurred while fetching feed posts.' });
    }
  };
export const changeStatus=async(req:Request,res:Response)=>{
    try{
      const {postId}=req.params;
      const db = await connectToDb();
      const post = await db?.collection('posts').findOne({ _id: new ObjectId(postId) });
    if (post) {
        const updatedValue = !post.completed; 
         await db?.collection('posts').updateOne(
          { _id: new ObjectId(postId) },
          { $set: { completed: updatedValue } }
        );
             const updatedPost= await db?.collection('posts').findOne({_id:new ObjectId(postId)});
             res.status(200).json(updatedPost);
          } 
      
      
    }catch(err){
        console.error('Error status feed posts:', err);
        res.status(500).json({ message: 'an error occured in status change.' });
    }
}
  