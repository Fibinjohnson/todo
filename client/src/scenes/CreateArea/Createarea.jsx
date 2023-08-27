import React from "react";
import { useState } from "react";
import './CreateArea.css'
import AddIcon from '@mui/icons-material/Add';


function CreateArea(props) {
    const [isExpand,setExpand]=useState(false);
    const [text,setText]=useState({
        title:"",
        content:""
    });
    function expanded(){
        setExpand(true)
    }
   
  return (
    <div>
      <form className="createAreaForm">
        <input className="createAreaInput" onClick={expanded} onChange= {event=>{ const {name,value}=event.target; setText(()=>{return{...text,[name]:value}})}} name="title" placeholder="To do title" value={text.title} />
       {isExpand && <textarea onChange= {event=>{ const {name,value}=event.target; setText(()=>{return{...text,[name]:value}})}} name="Description" placeholder="Add a short description..." rows="2" value={text.content} />} 
        {/* <button onClick={(e)=>{e.preventDefault(); props.AddContent(text)}}>Add</button> */}
        <AddIcon/>
      </form>
    </div>
  );
}

export default CreateArea;