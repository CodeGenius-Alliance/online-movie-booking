import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Blue
    },
    secondary: {
      main: '#FF5722', // Deep Orange
    },
    text: {
      secondary: '#607D8B', // Blue Grey
    },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Navbar */}
        <AppBar position="static">
          <Toolbar>
            {/* Left side: Text-based logo */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TicketBlitz
            </Typography>

            {/* Right side: Login buttons */}
            
            <Button color="inherit">User Login</Button>
            <Button color="inherit">Admin Login</Button>
            
            {/* <Button color="inherit">User Login</Button>
            <Button color="inherit">Admin Login</Button> */}
          </Toolbar>
        </AppBar>

        {/* Main content */}
        <Container>
          {/* Title */}
          <Box textAlign="center" mt={4}>
            <Typography variant="h3" component="h1" color="primary" gutterBottom>
              TicketBlitz
            </Typography>
          </Box>

          {/* Description */}
          <Box textAlign="center" my={4}>
            <Typography variant="h6" color="textSecondary" paragraph>
              Your one-stop solution for event ticketing.
            </Typography>
          </Box>

          {/* Get Started Button */}
          <Box textAlign="center" mb={4}>
            <Button variant="contained" color="secondary" size="large">
              Get Started Here
            </Button>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
