import React, { useState } from 'react';
import { setLogin } from '../../state';
import { useDispatch } from 'react-redux';
import config from '../../config';
import * as yup from 'yup'
import {Box, TextField} from '@mui/material'
import { Formik } from 'formik';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,


}
from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';


function Login() {
  const [invalidPassword,setInvalidPassword]=useState<string|null>('');
  const [registeredmsg,setRegisteredmsg]=useState<string|null>(null)
  const navigate=useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');
  const dispatch =useDispatch();
  const userSignupSchema = yup.object().shape({
    username: yup.string().required('Required'),
    email: yup.string().email().required('Required'),
    password: yup.string().min(8,'Password must be ateast 8 charactors').required('Required')
  })
  const userLoginSchema =yup.object().shape({
    email:yup.string().email().required('required'),
    password:yup.string().required('required')
  })
  const initialSignupValues={
    username:'',
    email:'',
    password:''
  }
  const initialLoginValues={
    email:"",
    password:''
  }
  const handleJustifyClick = (value:any) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const handleLogin=async(values:any ,onSubmitProps:any)=>{
    
    const loginUserData = await fetch(`${config.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(values),
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
  onSubmitProps.resetForm()
  }
const handleLoginClick=(values:any,onSubmitProps:any)=>{
  handleLogin(values,onSubmitProps)
}

  const handleRegisterClick=(values:any,onSubmitProps:any)=>{
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
        <Formik initialValues={initialLoginValues} 
        validationSchema={userLoginSchema}
         onSubmit={handleLoginClick}>
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            resetForm
        })=>( 
     
  <form  onSubmit={handleSubmit}>
    <TextField onBlur={handleBlur}
      onChange={handleChange} 
      name='email'
      value={values.email}
      error={Boolean(touched.email) && Boolean(errors.email)}
      helperText={ touched.email  && errors.email}
      label='Email Address'
      id='email' 
      type='email'
      size='small'
      sx={{width:'100%', padding:"7px" }}/>
  
  <TextField onBlur={handleBlur} 
          onChange={handleChange}
          value={values.password} 
          name='password'
          label='Password'
          error={Boolean(touched.password) && Boolean(errors.password)}
          variant="outlined" size="small" 
          helperText={touched.password && errors.password}    id='password' type='text'   
            sx={{width:'100%', padding:"7px"}}/>
    <MDBBtn type="submit" className="mb-4 w-100">Sign in</MDBBtn>
    {invalidPassword && <p style={{ color: 'red', border:'8px' }}>{invalidPassword}</p>}
   
  </form>
  )}
    </Formik> 
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
          <Formik initialValues={initialSignupValues} validationSchema={userSignupSchema} onSubmit={handleRegisterClick}>{({
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
          <Box marginBottom={'10px'}>
          <TextField onBlur={handleBlur} 
          label={'Username'}
          onChange={handleChange}
          value={values.username} 
          name='username'
          error={Boolean(touched.username) && Boolean(errors.username)}
          helperText={touched.username && errors.username}  
            id='username'
           type='text'
           variant="outlined" size="small" 
           sx={{width:'100%', padding:"7px" }}/>

          <TextField onBlur={handleBlur} 
          onChange={handleChange}
          value={values.email} 
          name='email'
          label='Email'
          error={Boolean(touched.email) && Boolean(errors.email)}
          helperText={touched.email && errors.email} id='email' type='email' 
          variant="outlined" size="small" 
           sx={{width:'100%', padding:"7px"}}/>

           <TextField onBlur={handleBlur} 
          onChange={handleChange}
          value={values.password} 
          name='password'
          label='password'
          error={Boolean(touched.password) && Boolean(errors.password)}
          variant="outlined" size="small" 
          helperText={touched.password && errors.password}    id='password' type='text'   
            sx={{width:'100%', padding:"7px"}}/>

          <MDBBtn type='submit'  className="mb-4 w-100">Sign up</MDBBtn>
          {registeredmsg && <p style={{ color: 'blue' }}>{registeredmsg}</p>}
          </Box>
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
