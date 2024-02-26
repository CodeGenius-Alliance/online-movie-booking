import React, { useState } from 'react'
import './AddMovie.css'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewMovie } from '../../Redux/Action/AdminAction';
import { useNavigate } from 'react-router-dom';


function AddMovie() {

  

  const dispatch=useDispatch();

  const initialValue = {title:'', description:'',actors:'',release_date:'',poster_url:'',featured:''};
 const navigate=useNavigate();
  const [movie,setMovie]=useState(initialValue);

 
  const AddMovieFunction=(e)=>{
    e.preventDefault()
    dispatch(AddNewMovie(movie))
    navigate('/')
  }
  
  const admin=useSelector((state)=>state.admin.admin)
 if(admin && admin.email)
  return (
    <>
    <div className='container'>
        <h1>ADD MOVIE DETAIL</h1>
        <form >
            
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="title">Movie Name: </label><input type="text" placeholder='Movie Name' onChange={(e)=>{setMovie({...movie,title:e.target.value})}} /></div>     
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie detail">Movie Detail: </label><input type="text" placeholder='Movie Detail' onChange={(e)=>{setMovie({...movie,description:e.target.value})}}/></div>     
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie actors">Actors: </label><input type="text" placeholder='Actors' onChange={(e)=>{setMovie({...movie,actors:e.target.value})}}/></div>
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie release at">Released At: </label><input type="date" placeholder='Release Date' onChange={(e)=>{setMovie({...movie,release_date:e.target.value})}}/></div>
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie poster">Poster Link: </label><input type="text" placeholder='Poster Url' onChange={(e)=>{setMovie({...movie,poster_url:e.target.value})}}/></div>
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie feature">Features</label><input type="text" placeholder='Features' onChange={(e)=>{setMovie({...movie,featured:e.target.value})}}/></div>
           <div><button onClick={(e)=>AddMovieFunction(e)}>ADD MOVIE</button></div>
        </form>
    </div>
    </>
  )
  else
  {
    navigate('/login')
  }
}

export default AddMovie