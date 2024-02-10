import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchAllMovies } from '../../Redux/Action/index';
import { Link } from 'react-router-dom';

function AllMovies() {
    const user=useSelector((state)=>state.user.user)
    const admin=useSelector((state)=>state.admin.admin)
    const movies=useSelector((state)=>state.common.movies)
    console.log("movies : ",movies)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(FetchAllMovies())
    },[])

    if(admin && admin.email)
    {
      return (
        <>
          {/* FETCH MOVIES FROM BACKEND AND APPLY CRUD OPERRATIONS ON IT LIKE ADD SHOW AND EDIT PRICE AND TIMING make template*/}
          <div>ALL MOVIES</div>
          {movies?.map((movie)=>(<>
           {movie.show?<>
           <Link to={`/OneMovie/${movie._id}`}>
            <div>{movie?._id}</div>
            <div>{movie?.title}</div>
            <div>BookNow</div>
           </Link>
           </>:<>
           <div>{movie?._id}</div>
            <div>{movie?.title}</div>
            <div>BookNow</div>
           </>}
          </>))}
        </>
      );
    }
    else{
      return (
        <> 
          {/* FETCH ALL THE MOVIES FROM THE BACKEND */}
          <div>ALL MOVIES SHOWN TO USER</div>
          
        </>
      );
    }
  }
  

export default AllMovies