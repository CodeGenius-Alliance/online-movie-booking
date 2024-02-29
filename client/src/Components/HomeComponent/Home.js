import React, { useEffect } from "react";
import Navbar from "../NavbarComponent/Navbar";
import "./Home.css";
import AddMovie from "../AdminComponent/AddMovie";
import AddScreen from "../AdminComponent/AddScreen";
import AddShow from "../AdminComponent/AddShow";
import { useDispatch, useSelector } from "react-redux";
import AllMovies from "./AllMovies";
import { FetchAllMovies } from "../../Redux/Action";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import Showslider from "./Showslider";

function Home() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);

  if (admin && admin.email) {
    return (
      <>
        <Showslider />
        <div className="flex-btn">
          <button>
            <Link className="link" to={"/admin/addmovie"}>
              Add Movie
            </Link>{" "}
            <br />
          </button>
          <button>
            <Link className="link" to={"/admin/addscreen"}>
              {" "}
              Add Screen
            </Link>
          </button>
        </div>
        {/** lists of movie and navigate to particular movie accordingly*/}

        <center>
          {" "}
          <AllMovies />
        </center>
      </>
    );
  } else {
    return (
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <Showslider />
        <center>
          {" "}
          <AllMovies />
        </center>
      </div>
    );
  }
}

export default Home;
