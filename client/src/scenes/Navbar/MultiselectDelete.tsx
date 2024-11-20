import React from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { setClearSelectedPosts, setPosts } from '../../state';
import config from '../../config';

interface State{
    _id:string
 }

interface Token {
    token :string
  }

  interface Userid {
    user:State
  }
export const MultiselectDelete = (props: any) => {
    const dispatch=useDispatch()
    const deletedFlag = useSelector((state: any) => state.deletedFlag)
    const userId=useSelector((state:Userid)=>state.user._id)

    const token=useSelector((state:Token)=>state.token)

    const handleDeletePosts=async()=>{
         try{
            const response = await fetch(`${config.apiUrl}/post/deletePosts`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                  body:JSON.stringify({userId:userId,
                                      posts:deletedFlag
                        })
                  });
      
              if (!response.ok) {
                  throw new Error('Request failed');
              }
      
              const deletedPost = await response.json();
              
              dispatch(setPosts({ posts: deletedPost }));
              dispatch(setClearSelectedPosts({posts:[]}))
         }catch(error){
            console.error('An error occurred:', error);
         }
    }


    return (
        <div>
            {deletedFlag.length > 0 && <div style={{ padding: '10px 20px', margin: '15px 0', display: 'flex', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                <span style={{ marginRight: '10px' }}>Delete {deletedFlag.length} tasks</span>
                <DeleteOutlineIcon  onClick={handleDeletePosts} />
            </div>
            }
        </div>
    )

}

