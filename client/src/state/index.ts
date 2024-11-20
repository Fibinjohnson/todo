import {createSlice} from "@reduxjs/toolkit";
const initialState={
    posts:[],
    token:null,
    user:null,
    deletedFlag:[]
}
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            console.log(action.payload.user,"action.payload.user")
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
       },
       setDeletedFlag:(state,action)=>{
        state.deletedFlag=action.payload.deletedFlag
       },
       setClearSelectedPosts:(state,action)=>{
        state.deletedFlag=action.payload.posts
       }
    }
})
export const {setLogin,setLogout,setPost,setPosts,setDelete ,setDeletedFlag ,setClearSelectedPosts}=authSlice.actions;
export default authSlice;