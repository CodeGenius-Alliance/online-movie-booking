import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FetchOneMovie } from '../../Redux/Action';

function AllShow() {

    const movie_id=useParams().movie_id;
    const admin=useSelector((state)=>state.admin.admin)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const movie=useSelector((state)=>state.common.oneMovie)
  
    useEffect(()=>{
      dispatch(FetchOneMovie(movie_id))
    },[dispatch])
    
    if(!admin.email)
    {
        navigate('/login')
    }


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
                   
                  <div key={show?.show_id} className="show">
                    <p><span className="h3">Show ID:</span> {show?._id}</p>
                    <p><span className="h3"> Date:</span> {show?.date}</p>
                    <p><span className="h3"> Time:</span> {show["show_time"]}</p>
                    <p><span className="h3"> Price:</span> {show?.price}</p>
                    <button onClick={()=>navigate(`/admin/${movie_id}/${screen.screen_id}/${show._id}`)}>View Booked Movies</button>
                  </div>
                  
                 
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );

}

export default AllShow