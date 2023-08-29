const {connectToDb}=require("../connection/connection");
const { ObjectId } = require("mongodb");


module.exports.addPost=async(req,res)=>{
  try{
    const {title,content,completed}=req.body
    const {userId}=req.params
    console.log(req.params)
    const database =await connectToDb();
    const addedPost=await database.collection('posts').insertOne({
         title,
         content,
         user:new ObjectId(userId),
         completed
    })
    res.status(200).json(addedPost);
  }catch(error){
    console.error('Error occured on adding:', error);
    res.status(500).json({ message: 'Error occured on adding' });
  }
   
}
module.exports.deletePost=async(req,res)=>{
  try{
     const db= await connectToDb();
     const {postId,userId}=req.params;
    
     const updatedPosts=await db.collection('posts').deleteOne({_id:new ObjectId(postId)});
     if (updatedPosts.modifiedCount > 0) {
        const updatedPosts= await db.collection('posts').find({user:new ObjectId(userId)}).toArray();
         res.status(200).json(updatedPosts);
     } 
     res.status(200)
  }catch(error){
    console.error('Error occured on deleting:', error);
    res.status(500).json({ message: 'Error occured on deleting' });
  }
}
module.exports.editPost=async(req,res)=>{
   try{
     const db=await connectToDb();
     const {postId}=req.params;
     const {title,userId,content,completed}=req.body
     const updatedPosts = await db.collection('posts').updateOne(
        { _id: new ObjectId(postId) },
        {
          $set: {
            title: title, 
            content: content, 
            completed: completed 
          }
        }
      );
      if (updatedPosts.modifiedCount > 0) {
        const editedPosts=await db.collection('posts').find({user:new ObjectId(userId)}).toArray();
        res.status(200).json(editedPosts);
      } 
      res.status(200)
   }catch(error){
   console.error('Error occured on editing:', error);
   res.status(500).json({ message: 'Error occured on editing' });
 }

}
module.exports.getFeedpost = async (req, res) => {
    try {
      const { userId } = req.params;
      const db = await connectToDb();
      const feedPosts = await db.collection('posts').find({ user: new ObjectId(userId) }).toArray();
      res.status(200).json(feedPosts);
    } catch (error) {
      console.error('Error fetching feed posts:', error);
      res.status(500).json({ message: 'An error occurred while fetching feed posts.' });
    }
  };
module.exports.changeStatus=async(req,res)=>{
    try{
      const {postId}=req.params;
      const {userId}=req.body;
      const db = await connectToDb();
      const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
    if (post) {
        const updatedValue = !post.completed; 
        const updatedPost = await db.collection('posts').updateOne(
          { _id: new ObjectId(postId) },
          { $set: { completed: updatedValue } }
        );
        if (updatedPost.modifiedCount > 0) {
             const updatedPosts= await db.collection('posts').find({user:new ObjectId(userId)}).toArray();
             res.status(200).json(updatedPosts);
          } 
        }else{
          res.status(200).json(post)
        }
      
    }catch(err){
        console.error('Error status feed posts:', err);
      res.status(500).json({ message: 'an error occured in status change.' });
    }
}
 
  
  
  
  
  
  