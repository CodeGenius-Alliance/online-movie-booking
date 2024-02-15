import React, { useState } from 'react'

function AddScreen() {
    const initialValue = {screen_name:'', number_of_seats:''};
    const [screen,setScreen]=useState(initialValue);

    const AddScreenFunction=(e)=>{
        e.preventDefault();
    }
    return (
        <>
        <div className='container'>
            <h1>ADD SCREEN DETAIL</h1>
            <form >
                
               <div className='d-flex flex-wrap justify-content-between'><label htmlFor="title">Screen Name: </label><input type="text" placeholder='Screen Name' onChange={(e)=>{setScreen({...screen,title:e.target.value})}} /></div>     
               <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie detail">Total Seats: </label><input type="Number" placeholder='Number of seats' onChange={(e)=>{setScreen({...screen,number_of_seats:e.target.value})}}/></div>     
              
               <div><button onClick={(e)=>AddScreenFunction(e)}>ADD SCREEN</button></div>
            </form>
        </div>
        </>
      )
}

export default AddScreen