import React from 'react';
import './MovieDetails.css'; // Import your stylesheet

const MovieDetails = () => {
  // Assuming you have only one movie in the array
  const movie=
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
    }


  return (
    <div className="movies-details-container">
      <div className="movies-details-left">
      <div className='movies-details'>
        <h2 className='title'>Title : {movie.title}</h2>
        {/* <h3 className='description'>Description : {movie.description}</h3> */}
        <h3 className='actors'>Actors :</h3>
        <ul>
          {movie.actors.map((actor, index) => (
            <li key={index}>{actor}</li>
          ))}
        </ul>
        <h3 className='descriptions'>Description : {movie.description}</h3>
        </div>
        <img className="movies-poster" src={movie.posterURL} alt={movie.title} />
        
      </div>
      <div className="movies-details-right">
        <div className="screen-container">
          {movie.screen.map((screen) => (
            <div key={screen.screen_id} className="screen">
              <p>Screen ID: {screen.screen_id}</p>
              <div className="show-container">
                {screen.show.map((show) => (
                  <div key={show.show_id} className="show">
                    <p>Show ID: {show.show_id}</p>
                    <p>Date: {show.date}</p>
                    <p>Time: {show.start_time} - {show.end_time}</p>
                    <p>Price: {show.price}</p>
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

