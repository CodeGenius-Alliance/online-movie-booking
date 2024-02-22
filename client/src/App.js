import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Register from "./Components/RegisterComponent/Register";
import AdminLogin from "./Components/LoginComponent/AdminLogin";
import { Provider } from 'react-redux'
import { MyStore } from "./Redux/Store/MyStore";
import Navbar from "./Components/NavbarComponent/Navbar";
import MovieDetails from "./Components/UserComponent/MovieDetails";
import SeatSelection from "./Components/UserComponent/SeatSelection";

function App() {
  return (
    <>
      {/* define code */}
    <Provider store={MyStore}>
      <BrowserRouter>
      <div className="head-title">
        <img src="/Newlogo.png" alt="Logo" className="logo"></img>
        <div className="appname">JustBookit</div>
      </div>
      <Navbar />
      <div className="banners"></div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/moviedetails" element={<MovieDetails />} />
          <Route path="/seatselection" element={<SeatSelection />} />
        </Routes>
        
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
