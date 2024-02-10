import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/HomeComponent/Home";
import Login from "./Components/LoginComponent/Login";
import Register from "./Components/RegisterComponent/Register";
import AdminLogin from "./Components/LoginComponent/AdminLogin";
import { Provider } from 'react-redux'
import { MyStore } from "./Redux/Store/MyStore";
import Navbar from "./Components/NavbarComponent/Navbar";

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
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
