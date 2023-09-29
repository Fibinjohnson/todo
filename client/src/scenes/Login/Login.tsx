import React, { useState } from 'react';
import { setLogin } from '../../state';
import { useDispatch } from 'react-redux';
import config from '../../config';
import * as yup from 'yup'
import {TextField} from '@mui/material'
import { Formik } from 'formik';
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
  const [invalidPassword,setInvalidPassword]=useState<string|null>('');
  const [registeredmsg,setRegisteredmsg]=useState<string|null>(null)
  const navigate=useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');
  const dispatch =useDispatch();
  const userSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  const initialValues={
    username:'',
    email:'',
    password:''
  }
  const handleJustifyClick = (value:any) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const handleLogin=async(e:any)=>{
    e.preventDefault();
    const loginUserData = await fetch(`${config.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email:loginEmail,
          password:loginPassword}),
      });
       const loggedInUser=await loginUserData.json();
       
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
  const handleClick=(values:any,onSubmitProps:any)=>{
    handleRegister(values,onSubmitProps)
  }
  const handleRegister=async(values:any,onSubmitProps:any)=>{

       const savedUserResponse = await fetch(`${config.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(values),
      });
       const savedUser=await savedUserResponse.json();
       setRegisteredmsg(savedUser.msg)
       onSubmitProps.resetForm();
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
          <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleClick}>{({
             values,
             errors,
             touched,
             handleSubmit,
             handleChange,
             handleBlur,
             setFieldValue,
             resetForm
          })=>(
        <form onSubmit={handleSubmit}>
          <TextField onBlur={handleBlur} 
          label={'Username'}
          onChange={handleChange}
          value={values.username} 
          name='username'
          error={Boolean(touched.username) && Boolean(errors.username)}
          helperText={touched.username && errors.username}    id='username' type='text'/>
          <TextField onBlur={handleBlur} 
          onChange={handleChange}
          value={values.email} 
          name='email'
          label='Email'
          error={Boolean(touched.email) && Boolean(errors.email)}
          helperText={touched.email && errors.email} id='email' type='email'/>
           <TextField onBlur={handleBlur} 
          onChange={handleChange}
          value={values.password} 
          name='password'
          label='password'
          error={Boolean(touched.password) && Boolean(errors.password)}
          helperText={touched.password && errors.password}    id='password' type='text'/>

          <MDBBtn type='submit'  className="mb-4 w-100">Sign up</MDBBtn>
          {registeredmsg && <p style={{ color: 'blue' }}>{registeredmsg}</p>}
        </form>
          )
}
        </Formik>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default Login;
