import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email,setEmail]=useState("")
  const navigate=useNavigate()
  const [password,setPassword]=useState("")
  const auth=useAuth()
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('/admins/login',{"email":email,"password":password}).then(res=>{
      auth.verify(res.data.accessToken)
      alert("Login successfull")
      navigate('/screens/addScreen')
    }).catch(e=>alert(e.response.data))
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {/* Email Input */}
          <TextField
          type='email'
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={(e)=>setEmail(e.target.value)}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          {/* Password Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {/* Login Button */}
          <Button onClick={(e)=>handleSubmit(e)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          {/* Registration Link only for user*/}
          {auth.isUser && <Box textAlign="center">
            <Link href="#" variant="body2">
              {"Don't have an account? Register here"}
            </Link>
          </Box>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
