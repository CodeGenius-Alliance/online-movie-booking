import React, { useState } from 'react'
import './AddMovie.css'


function AddMovie() {

  const initialValue = {title:'', description:'',actors:'',release_date:'',poster_url:'',featured:''};
 
  const [show,setShow]=useState(initialValue);

  const AddMovieFunction=(e)=>{
    e.preventDefault()
  }

  return (
    <>
    <div className='container'>
        <h1>ADD MOVIE DETAIL</h1>
        <form >
            
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="title">Movie Name: </label><input type="text" placeholder='Movie Name' onChange={(e)=>{setShow({...show,title:e.target.value})}} /></div>     
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie detail">Movie Detail: </label><input type="text" placeholder='Movie Detail' onChange={(e)=>{setShow({...show,description:e.target.value})}}/></div>     
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie actors">Actors: </label><input type="text" placeholder='Actors' onChange={(e)=>{setShow({...show,actors:e.target.value})}}/></div>
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie release at">Released At: </label><input type="date" placeholder='Release Date' onChange={(e)=>{setShow({...show,release_date:e.target.value})}}/></div>
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie poster">Poster Link: </label><input type="text" placeholder='Poster Url' onChange={(e)=>{setShow({...show,poster_url:e.target.value})}}/></div>
           <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie feature">Features</label><input type="text" placeholder='Features' onChange={(e)=>{setShow({...show,featured:e.target.value})}}/></div>
           <div><button onClick={(e)=>AddMovieFunction(e)}>ADD MOVIE</button></div>
        </form>
    </div>
    </>
  )
}

export default AddMovie