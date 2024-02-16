import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FetchShows } from '../../Redux/Action/AdminAction';
import { Link, useParams } from 'react-router-dom';

function AllShows() {
    const dispatch=useDispatch();
    const {movie_id}=useParams();
    useEffect(()=>{
        dispatch(FetchShows())
    })
  return (
    <>
    <Link to={`/admin/:${movie_id}`}>Add New show</Link>
    {/* list all the shows acc to the screen id and navigate to screenid and show id respectively */}
    </>
    
  )
}

export default AllShows