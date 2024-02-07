import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
const AddScreen = () => {
    const navigate=useNavigate()
    const [screenInfo, setScreenInfo] = useState({
        screen_id: '',
        no_of_seats:0,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setScreenInfo((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const auth=useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/screens/addScreen',
    { "screen_id":screenInfo.screen_id,
      "no_of_seats":screenInfo.no_of_seats
  },{headers:{Authorization:`Bearer ${auth.token}`}}).then(res=>{
    alert(res.data)
    setScreenInfo({screen_id: '',
    no_of_seats: 0,
    })
    navigate('/shows/addShow')
  }).catch(e=>alert(e.response.data))
  };

  return (
    <div>
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
          Add Screen
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>

          <TextField
          type='text'
            margin="normal"
            required
            fullWidth
            id="screen_id"
            onChange={handleChange}
            label="screen_id"
            name="screen_id"
            autoFocus
            value={screenInfo.screen_id}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="no_of_seats"
            onChange={handleChange}
            value={screenInfo.no_of_seats}
            label="no_of_seats"
            type="number"
            id="no_of_seats"
          />

          <Button onClick={(e)=>handleSubmit(e)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Screen
          </Button>

        </Box>
      </Box>
    </Container>
    </div>
  )
}

export default AddScreen
