import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setLogin } from '../../state';
import { useDispatch } from 'react-redux';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,

}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginEmail,setLoginMail]=useState('')
  const [loginPassword,setLoginPassWord]=useState('')
  const [registerName,setRegisterName]=useState('')
  const [registerEmail,setRegisterEmail]=useState('')
  const [registerPassword,setPassword]=useState('')
  const [invalidPassword,setInvalidPassword]=useState()
  const navigate=useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');;
  const dispatch =useDispatch();
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const handleLogin=async(e)=>{
    e.preventDefault();
    const loginUserData = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email:loginEmail,
          password:loginPassword}),
      });
       const loggedInUser=await loginUserData.json();
       console.log(loggedInUser,'loggedinUser')
       if(loggedInUser.msg){
          setInvalidPassword(loggedInUser.msg)
       }else{
        setInvalidPassword(null)
        if(loggedInUser.user){
          dispatch(setLogin(
            {
              user:loggedInUser.user,
              token:loggedInUser.token
            }
          ))
          navigate('/home')
        }
  }
  }
  const handleRegister=async(e)=>{
    e.preventDefault();
       const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that you're sending JSON data
        },
        body: JSON.stringify({name:registerName,
          email:registerEmail,
          password:registerPassword}),
      });
       const savedUser=await savedUserResponse.json();
       setRegisterEmail('');
       setRegisterName('');
       setPassword('')
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
      <MDBTabsPane show={justifyActive === 'tab1'}>
     
  <form  onSubmit={handleLogin}>
    <MDBInput onChange={(e)=>setLoginMail(e.target.value)} value={loginEmail}  wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
    <MDBInput onChange={(e)=>setLoginPassWord(e.target.value)} value={loginPassword} wrapperClass='mb-4' label='Password' id='form2' type='password'/>
    <MDBBtn type="submit" className="mb-4 w-100">Sign in</MDBBtn>
    {invalidPassword && <p style={{ color: 'red' }}>{invalidPassword}</p>}

  </form>
  
  <p className="text-center">
   {/* eslint-disable-next-line */}
    Not a member?
     {/* eslint-disable-next-line */}
    <a href="#" onClick={() => handleJustifyClick('tab2')} style={{ color: 'blue', cursor: 'pointer' }}>
      Register
    </a>
  </p>
</MDBTabsPane>


        <MDBTabsPane show={justifyActive === 'tab2'}>
        <form onSubmit={handleRegister}>
          <MDBInput onChange={(e)=>setRegisterName(e.target.value)} value={registerName} wrapperClass='mb-4' label='Username' id='username' type='text'/>
          <MDBInput onChange={(e)=>setRegisterEmail(e.target.value)} value={registerEmail} wrapperClass='mb-4' label='Email' id='email' type='email'/>
          <MDBInput onChange={(e)=>setPassword(e.target.value)} value={registerPassword} wrapperClass='mb-4' label='Password' id='password' type='password'/>

          

          <MDBBtn type='submit'  className="mb-4 w-100">Sign up</MDBBtn>
        </form>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default Login;
