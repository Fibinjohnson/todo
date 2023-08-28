import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState ,useEffect} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { setPosts } from "../../state";
import CheckIcon from '@mui/icons-material/Check';

function TaskItem({completed,postId,title,content}) {
    const userId=useSelector((state)=>state.user._id)
    const token=useSelector((state)=>state.token)
    const dispatch=useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteClicked,setDeleteClicked]=useState(false)
    const [heading,setTitle]=useState(title);
    const [descreption,setContent]=useState(content);
    const taskItemStyles = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    width:'518px',
    marginLeft:'378px',
    position: 'relative',
  };
  const taskcheckedItemStyles = {
    border: '3px solid black ',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    width:'518px',
    marginLeft:'378px',
    position: 'relative',
    backgroundColor:'grey'
  };

  const iconsContainerStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyles = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  };

  
  const checkStatus=async(e)=>{
   
    const response=await fetch(`https://task-manager-hcw2.onrender.com/post/${postId}/checked`,{
      method:"PATCH",
      headers:{"Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"},
      body:JSON.stringify({userId:userId})
     
    })
    const updatedPost=await response.json();
   
    dispatch(setPosts({posts:updatedPost}));
  }
  const handleDelete=async(e)=>{
    
    setDeleteClicked(!deleteClicked)
    const response=await fetch(`https://task-manager-hcw2.onrender.com/post/${postId}/deletePost`,{
        method:'DELETE',
        headers:{"Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"},
        body:JSON.stringify({userId:userId})
    })
    const deletedPost=await response.json();
    dispatch(setPosts({posts:deletedPost}));
  }

  const getMyPosts=async ()=>{
      
    try{
     const postResponse=await fetch(`https://task-manager-hcw2.onrender.com/post/${userId}`,{
         method:"GET",
         headers:{Authorization:`Bearer ${token}`}
     });
     const data=await postResponse.json()
        dispatch(setPosts({posts:data}))
 }catch(err){
     console.log("get feedPosts error",err)
 }
}
 
useEffect(()=>getMyPosts,[deleteClicked])

const handleEditIconClick=async()=>{
    setIsEditMode(true);
}
const handleSaveIconClick=async()=>{
    setIsEditMode(false);
    setDeleteClicked(!deleteClicked);
    const response=await fetch(`https://task-manager-hcw2.onrender.com/post/${postId}/editpost`,{
        method:'PATCH',
        headers:{"Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"},
        body:JSON.stringify({userId:userId,title:heading,content:descreption,completed:false})
    })
    const editedpost=await response.json();
    dispatch(setPosts({posts:editedpost}));
}

  return (
    <div style={completed ?taskcheckedItemStyles:taskItemStyles}>
      <FormControlLabel
        control={<Checkbox />}
        checked={completed}
        onChange={checkStatus} 
        label={completed?"Completed":'Mark as complete'}
        style={{ marginBottom: '5px' }}
      />
      
      <div style={iconsContainerStyles}>
      {isEditMode ? (
          <CheckIcon style={{ marginRight: '10px' }} onClick={handleSaveIconClick} />
        ) : (
          <EditIcon style={{ marginRight: '10px' }} onClick={handleEditIconClick} />
        )}
        <DeleteIcon onClick={handleDelete} />
      </div>
      
       
      {isEditMode ? (
        <input
          type="text"
          value={heading}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <Typography variant="h6" style={titleStyles}>
          {title}
        </Typography>
      )}

      {isEditMode ? (
        <textarea
          value={descreption}
          onChange={(e) => setContent(e.target.value)}
          rows="4" // Adjust the number of rows as needed
  cols="50" 
        />
      ) : (
        <Typography style={{ fontStyle: 'italic' }}>{content}</Typography>
      )}
    </div>
  );
}

export default TaskItem;
//  onChange={onCheckboxChange} 
