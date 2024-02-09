import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

 const AddShows = () => {
  const [showInfo, setShowInfo] = useState({
    show_id:'',
    screen_id: '',
    movie_id: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const auth=useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/shows/addShow',
    {"show_id":showInfo.show_id,
      "screen_id":showInfo.screen_id,
    "movie_id":showInfo.movie_id,
    "date":showInfo.date,
    "time":showInfo.time
  },{headers:{Authorization:`Bearer ${auth.token}`}}).then(res=>{
    alert(res.data)
    setShowInfo({
        show_id:'',
    screen_id: '',
    movie_id: '',
    date: '',
    time: '',})
  }).catch(e=>alert(e.response.data))
  };

  return(<div>
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
          Add Shows
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          type='text'
            margin="normal"
            required
            fullWidth
            id="show_id"
            onChange={handleChange}
            label="show_id"
            name="show_id"
            value={setShowInfo.show_id}
          />

          <TextField
          type='text'
            margin="normal"
            required
            fullWidth
            value={setShowInfo.screen_id}
            id="screen_id"
            onChange={handleChange}
            label="screen_id"
            name="screen_id"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            value={showInfo.movie_id}
            name="movie_id"
            onChange={handleChange}
            label="movie_id"
            type="text"
            id="movie_id"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            value={showInfo.date}
            name="date"
            onChange={handleChange}
            type="date"
            id="date"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            value={showInfo.time}
            name="time"
            onChange={handleChange}
            type="time"
            id="time"
          />
          <Button onClick={(e)=>handleSubmit(e)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Shows
          </Button>

        </Box>
      </Box>
    </Container>
  </div>)
 }
export default AddShows