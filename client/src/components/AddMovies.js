import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
const AddMovie = () => {
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState({
    movie_id: "",
    title: "",
    description: "",
    releaseDate: "",
    posterUrl: "",
    featured: "",
    actors: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "/movie/addMovie",
        {
          movie_id: movieInfo.movie_id,
          title: movieInfo.title,
          description: movieInfo.description,
          releaseDate: movieInfo.releaseDate,
          posterUrl: movieInfo.posterUrl,
          featured: movieInfo.featured,
          actors: movieInfo.actors,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((res) => {
        alert(res.data);
        setMovieInfo({
          movie_id: "",
          title: "",
          description: "",
          releaseDate: "",
          posterUrl: "",
          featured: "",
          actors: "",
        });
        navigate("/screens/addScreens");
      })
      .catch((e) => alert(e.response.data));
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Movie
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              type="text"
              margin="normal"
              required
              fullWidth
              id="movie_id"
              onChange={handleChange}
              label="movie_id"
              name="movie_id"
              autoFocus
              value={movieInfo.movie_id}
            />
            <TextField
              type="text"
              margin="normal"
              required
              fullWidth
              id="title"
              onChange={handleChange}
              label="title"
              name="title"
              autoFocus
              value={movieInfo.title}
            />
            <TextField
              type="text"
              margin="normal"
              required
              fullWidth
              id="description"
              onChange={handleChange}
              label="description"
              name="description"
              autoFocus
              value={movieInfo.description}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={movieInfo.releaseDate}
              name="releaseDate"
              onChange={handleChange}
              type="date"
              id="releaseDate"
            />
            <TextField
              type="text"
              margin="normal"
              required
              fullWidth
              id="posterUrl"
              onChange={handleChange}
              label="posterUrl"
              name="posterUrl"
              autoFocus
              value={movieInfo.posterUrl}
            />
            <TextField
              type="boolean"
              margin="normal"
              required
              fullWidth
              id="featured "
              onChange={handleChange}
              label="featured "
              name="featured "
              autoFocus
              value={movieInfo.featured }
            />
            <TextField
              type="text"
              margin="normal"
              required
              fullWidth
              id="actors"
              onChange={handleChange}
              label="actors"
              name="actors"
              autoFocus
              value={movieInfo.actors}
            />
        

            

            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Movie
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AddMovie;
