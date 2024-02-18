import React, { useEffect } from 'react';
import './MovieDetails.css'; // Import your stylesheet
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOneMovie } from '../../Redux/Action';

const MovieDetails = () => {
  // Assuming you have only one movie in the array
  const movie_id=useParams().movie_id;
  const dispatch=useDispatch();
  const movie=useSelector((state)=>state.common.oneMovie)

  useEffect(()=>{
    dispatch(FetchOneMovie(movie_id))
  },[])
  
  console.log("movie",movie)


  return (
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
        <img className="movies-poster" src={movie?.posterURL} alt={movie?.title} />
        
      </div>
      <div className="movies-details-right">
        <div className="screen-container">
          {movie?.screen?.map((screen) => (
            <div key={screen?.screen_id} className="screen">
              <p>Screen ID: {screen?.screen_id}</p>
              <div className="show-container">
                {screen?.show?.map((show) => (
                  <div key={show?.show_id} className="show">
                    <p>Show ID: {show?.show_id}</p>
                    <p>Date: {show?.date}</p>
                    <p>Time: {show?.start_time} - {show?.end_time}</p>
                    <p>Price: {show?.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

