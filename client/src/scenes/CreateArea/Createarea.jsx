import React from "react";
import { useState } from "react";
import './CreateArea.css'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import TaskItem from "./TaskItem";
import { useDispatch } from "react-redux";
import { setPosts } from "../../state";
import { useEffect } from "react";

function CreateArea() {
   const [isFetching, setIsFetching] = useState(false);
    const user=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const token=useSelector((state)=>state.token)
    const [isExpand,setExpand]=useState(false);
    const feedPosts=useSelector((state)=>state.posts)
    const [text,setText]=useState({
        title:"",
        content:"",
        user:user._id,
        completed:false
    });
 
    function expanded(){
        setExpand(true)
    }
    const handlePostClick = async () => {
      try {
        setIsFetching(true); // Assuming you want to set fetching to true when the request is sent
        const { user } = text;
    
        const addPost = await fetch(`https://task-manager-hcw2.onrender.com/post`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(text),
        });
    
        if (addPost.ok) {
          setText({
            title: '',
            content: '',
            user: user._id,
          });
        } else {
          console.error('Failed to add post');
        }
      } catch (error) {
        console.error('Error adding post:', error);
        
      }
    };
    
    const getMyPosts=async ()=>{
      
       try{
        const postResponse=await fetch(`https://task-manager-hcw2.onrender.com/post/${user._id}`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`}
        });
        const data=await postResponse.json()
           dispatch(setPosts({posts:data}))
    }catch(err){
        console.log("get feedPosts error",err)
    }
  }
    
    const handleTextChange = (event) => {
      const { name, value } = event.target;

      setText((prevText) => ({ ...prevText, [name]: value }));
    };
    useEffect(() => {
        getMyPosts();
    }, [isFetching]);
  return (
    <div data-testid='createarea'> 
      <form className="createAreaForm" onSubmit={handlePostClick}>
        <input className="createAreaInput" onClick={expanded} onChange= {event=>{ const {name,value}=event.target; setText(()=>{return{...text,[name]:value}})}} name="title" placeholder="To do title" value={text.title} />
       {isExpand && <input
      onChange={handleTextChange} 
      name="content"
      placeholder="Add a short description..."
      rows="1"
      value={text.content} 
    />}
        <IconButton type="submit" >
         <AddIcon className="AddIcon"/>
        </IconButton>
      </form>
      {!feedPosts.message &&
  feedPosts.map((post) => (
    <TaskItem completed={post.completed} postId={post._id} title={post.title} content={post.content} key={post._id} />
  ))
}
    </div>
  );
}

export default CreateArea;