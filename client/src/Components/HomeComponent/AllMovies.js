import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllMovies } from "../../Redux/Action/index";
import "./AllMovies.css";

function AllMovies() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  const movie = useSelector((state) => state.common.movies);
  console.log("movies : ", movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchAllMovies());
     
  },[]);

  const movies=[
    {
      movie_id: 1,
      title: "Spiderman",
      posterURL: "https://www.themoviedb.org/t/p/original/3csIdytRnmRNh1EjHD9Nrej3L2H.jpg",
      description: "a Movie about SpiderMan",
      actors:['Sam','Ram'],
      screen:[{
        screen_id:1,
        show:[{
          show_id:1,
        date:"12.02.2020",
        start_time:"10:00",
        end_time:"12:00",
        price:120,
        },
        {
          show_id:2,
        date:"12.02.2020",
        start_time:"10:00",
        end_time:"12:00",
        price:120,
        }]
      },
      {
        screen_id:2,
        show:[{
          show_id:1,
        date:"12.02.2020",
        start_time:"10:00",
        end_time:"12:00",
        price:120,
        }]
      }
    ]
    },
    {
      movie_id: 2,
      title: "Iron Man",
      posterURL: "https://image.tmdb.org/t/p/original/205zGVXs8fraqPgirjkCIx4J55h.jpg",
      description: "a Movie about Ironman",
      actors:['Som','Raju'],
      screen:[{
        screen_id:1,
        show:[{
          show_id:1,
        date:"12.02.2020",
        start_time:"10:00",
        end_time:"12:00",
        price:120,
        },
        {
          show_id:2,
        date:"12.02.2020",
        start_time:"10:00",
        end_time:"12:00",
        price:120,
        }]
      },
      {
        screen_id:2,
        show:[{
          show_id:1,
        date:"12.02.2020",
        start_time:"10:00",
        end_time:"12:00",
        price:120,
        }]
      }]
    },
  ]

  if (admin && admin.email) {
    return (
      <>
       <div className="movies-container">
        <div className="movies-heading">ALL MOVIES</div>
        <div className="movie-selection">
          {movies?.map((movie) => (
            //  <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id} className="movie-link">
            <div className="movie" key={movie.movie_id}>
              <img className="movie-poster" src={movie.posterURL} alt={movie.title} />
              <div className="movie-title">{movie.title}</div>
            </div>
            // </Link>
          ))}
        </div>
      </div>
      </>
    );
  } else {
    return (
      <>
        {/* FETCH ALL THE MOVIES FROM THE BACKEND */}
        <div>ALL MOVIES SHOWN TO USER</div>
      </>
    )

  }
}

export default AllMovies;
