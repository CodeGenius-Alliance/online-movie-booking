import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllMovies } from "../../Redux/Action/index";
import "./AllMovies.css";
import './Home.css'
import { Link } from "react-router-dom";
import { Toaster, toast} from "sonner";

function AllMovies() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  const movies = useSelector((state) => state.common.movies);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setIsLoading(true)
    dispatch(FetchAllMovies()).then((res)=>{
      setIsLoading(false)
    });
   
  }, []);

 return (
 <>

 <div> <Toaster position="bottom-right" richColors /></div>
 {(admin && admin.email)?  (
      <>
     
        <div className="movies-container">
        
          <div className="movies-heading">ALL MOVIES</div>
          <div className="movie-selection">
            {movies?.map((movie) => (
              //  <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id} className="movie-link">
              <div className="movie" key={movie._id}>
                
                <img
                  className="movie-poster"
                  src={movie["posterUrl"]}
                  alt={movie.title}
                />
                <div><span className="h3">MOVIE ID : </span>hi: {movie._id}</div>
                <div className="movie-title"><span className="h3"> MOVIE-TITLE :</span>{movie.title}</div>
            
                  <button ><Link  className="link" to={`/admin/addshow/${movie._id}`}>Add Show</Link></button>
                <button><Link className="link" to={`/admin/${movie._id}`}>View Show</Link></button>
                  </div>
                
              // </Link>
            ))}
          </div>
        </div>
      </>
    ):  (
      <>
      
     
        <div className="movies-container">
       
          <div className="movies-heading">ALL MOVIES</div>
          <div className="movie-selection">
            {movies?.map((movie) =>  {
              if(movie.screen.length>0 && movie.screen.map((show)=>show._id))
              return (
              //  <Link to={`/movie/${movie.movie_id}`} key={movie.movie_id} className="movie-link">
              
              <div className="movie" key={movie._id}>
                
                <img
                  className="movie-poster"
                  src={movie["posterUrl"]}
                  alt={movie.title}
                />
                <div>hi: {movie._id}</div>
                <div className="movie-title">{movie.title}</div>
                
                <button><Link className="link" to={`/user/${movie._id}`}>Read more...</Link></button>
              </div>
              // </Link>
            )
            else{
              return (<>
              
              </>)
             }
          }
            
            )
              // </Link>
            }
          </div>
        </div>
      </>
    )
          }
 </>)
  

 
}

export default AllMovies;
