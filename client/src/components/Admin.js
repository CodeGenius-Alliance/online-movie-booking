import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/material";
import { getAllMovies } from "./api-helpers/api-helpers";

const Header = () => {
  const [value, setValue] = useState(0);
  const [movies , setMovies] = useState([])

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppBar sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search All movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherits"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => {
              setValue(val);
            }}
          >
            <Tab label="Movies" />
            <Tab label="login" />
            <Tab label="User" />
            <Tab />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;