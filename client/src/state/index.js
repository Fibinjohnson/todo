import {createSlice} from "@reduxjs/toolkit";
const initialState={
    posts:[],
    token:null,
    user:null
}
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
        },
        setPosts:(state,action)=>{
            state.posts=action.payload.posts;
       },
       setPost:(state,action)=>{
           const updatedPost=state.posts.map((post)=>{
               if(post._id===action.payload.post._id){
                   return action.payload.post;
               }else{
                   return post;
               }
           })
           state.posts=updatedPost;
       }
    }
})
export const {setLogin,setLogout,setPost,setPosts}=authSlice.actions;
export default authSlice;