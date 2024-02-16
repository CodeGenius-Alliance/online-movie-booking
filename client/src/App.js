import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Register from "./Components/RegisterComponent/Register";
import AdminLogin from "./Components/LoginComponent/AdminLogin";
import { Provider } from 'react-redux'
import { MyStore } from "./Redux/Store/MyStore";
import Navbar from "./Components/NavbarComponent/Navbar";

import AddMovie from "./Components/AdminComponent/AddMovie";
import ViewBookings from "./Components/AdminComponent/ViewBookings";
import AddShow from "./Components/AdminComponent/AddShow";

import MovieDetails from "./Components/UserComponent/MovieDetails";
import SeatSelection from "./Components/UserComponent/SeatSelection";


function App() {
  return (
    <>
      {/* define code */}
    <Provider store={MyStore}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/admin">
            <Route path=":movie_id" element={<AddShow/>}></Route>
            <Route path=":movie_id/:screen_id/:show_id" element={<ViewBookings/>}></Route>
          </Route>

          <Route path="/moviedetails" element={<MovieDetails />} />
          <Route path="/seatselection" element={<SeatSelection />} />

        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
