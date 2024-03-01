import React, { useEffect } from 'react';
import './MovieDetails.css'; // Import your stylesheet
import '../HomeComponent/Home.css'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOneMovie } from '../../Redux/Action';

const MovieDetails = () => {
  // Assuming you have only one movie in the array
  const movie_id=useParams().movie_id;
  const user=useSelector((state)=>state.user.user)
  const dispatch=useDispatch();
  const movie=useSelector((state)=>state.common.oneMovie)

  useEffect(()=>{
    dispatch(FetchOneMovie(movie_id))
  },[dispatch])
  
  console.log("movie",movie)


  return (
    <>
    <div className="close-btn"><Link to={'/'}><img src="/closebtn.png" alt="" className="logo-img"  /></Link></div>

    <div className="movies-details-container">
      
      <div className="movies-details-left">
      <div className='movies-details'>
        <h2 className='title'>Title : {movie?.title}</h2>
        {/* <h3 className='description'>Description : {movie.description}</h3> */}
        <h3 className='actors'>Actors :</h3>
        <ul>
          {movie?.actors?.map((actor, index) => (
            <li key={index}>{actor}</li>
          ))}
        </ul>
        <h3 className='descriptions'>Description : {movie?.description}</h3>
        </div>
        <img className="movies-poster" src={movie["posterUrl"]} alt={movie?.title} />
        
      </div>
      <div className="movies-details-right">
        <div className="screen-container">
          {movie?.screen?.map((screen,index) => (
            <div key={screen?.screen_id} className="screen">
              <p><span className='h3' >Screen ID:</span> {screen?.screen_id}</p>
              <div className="show-container">
                {screen?.show?.map((show) => (   
                    <Link to={'/user/'+movie_id+'/'+screen.screen_id+'/'+show._id}>
                  <div key={show?.show_id} className="show">
                    <p><span className="h3">Show ID:</span> {show?._id}</p>
                    <p><span className="h3"> Date:</span> {show?.date}</p>
                    <p><span className="h3"> Time:</span> {show["show_time"]}</p>
                    <p><span className="h3"> Price:</span> {show?.price}</p>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default MovieDetails;

