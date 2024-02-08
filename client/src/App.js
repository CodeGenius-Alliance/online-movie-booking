import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/HomeComponent/Home";
import Navbar from "./Components/NavbarComponent/Navbar";import Login from "./Components/LoginComponent/Login";
import Register from "./Components/RegisterComponent/Register";
import AdminLogin from "./Components/LoginComponent/AdminLogin";

function App() {
  return (
    <>
      {/* define code */}
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
