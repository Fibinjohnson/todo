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
       setPost:(state:any,action)=>{
           const updatedPost=state.posts.map((post:any)=>{
               if(post._id===action.payload.post._id){
                   return action.payload.post;
               }else{
                   return post;
               }
           })
           state.posts=updatedPost;
       },
       setDelete:(state,action)=>{
        const updatedPosts=state.posts.filter((post:any)=>{
                return post._id !== action.payload.post._id
        })
         state.posts=updatedPosts
       }
    }
})
export const {setLogin,setLogout,setPost,setPosts,setDelete}=authSlice.actions;
export default authSlice;