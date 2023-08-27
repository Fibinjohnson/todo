import React from 'react'
import {Link} from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state';

function Navbar() {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
    const logout=()=>{
      
    }
  return (
    <div className='navbar'>
<h1>MyBlog</h1>
<div className='links'>
{/* <Link to='/' >Home</Link>
<Link to='/create' style={{color:"white",backgroundColor:'#f1356d', borderRadius:"8px"}}>New blog</Link> */}
</div>   
<Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
       {user.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>dispatch(setLogout())} >Logout</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
 
    </div>
  )
}

export default Navbar