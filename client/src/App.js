import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/HomeComponent/Home";
import Navbar from "./Components/NavbarComponent/Navbar";

function App() {
  return (
    <>
      {/* define code */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
