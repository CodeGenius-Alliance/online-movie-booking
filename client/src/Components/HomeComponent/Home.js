import React, { useEffect } from "react";

import "./Home.css";

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
      <div className="main">
        <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>Coming Soon</h2>
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
        <h2
          style={{
            marginTop: "20px",
            marginBottom: "1px",
            marginLeft: "20px",
          }}
        >
          Shows
        </h2>
        <center>
          {" "}
          <AllMovies />
        </center>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="Main-heading ">
          <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>
            Coming Soon
          </h2>
          <Showslider />
          <div>
            {" "}
            <h2
              style={{
                marginTop: "20px",
                marginBottom: "1px",
                marginLeft: "20px",
              }}
            >
              Shows
            </h2>
            <AllMovies />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
