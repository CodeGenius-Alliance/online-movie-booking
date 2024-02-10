import React, { useState } from 'react'

function AddShow() {
    /*show:[{
        date:{type:Date},
        start_time:{type:String},
        end_time:{type:String},
        price:{type:String},
        bookings:[{
            user_id:{type:String},
            seats:{type:Array}
        }]
    }] */
    const initialValue = {date:'', start_time:'',end_time:'',price:''};
 
    const [show,setShow]=useState(initialValue);
  
    const AddShowFunction=(e)=>{
      e.preventDefault()
    }
  
    return (
      <>
      <div className='container'>
          <h1>ADD SHOW DETAIL</h1>
          <form > 
             <div className='d-flex flex-wrap justify-content-between'><label htmlFor="Date">Date</label><input type="date" placeholder='Date' onChange={(e)=>{setShow({...show,date:e.target.value})}} /></div>     
             <div className='d-flex flex-wrap justify-content-between'><label htmlFor="Start date">Start Time: </label><input type="date" placeholder='Start Time' onChange={(e)=>{setShow({...show,start_time:e.target.value})}}/></div>     
             <div className='d-flex flex-wrap justify-content-between'><label htmlFor="End date">End Time: </label><input type="date" placeholder='End Time' onChange={(e)=>{setShow({...show,end_time:e.target.value})}}/></div>
             <div className='d-flex flex-wrap justify-content-between'><label htmlFor="Price">Price: </label><input type="Number" placeholder='Price' onChange={(e)=>{setShow({...show,price:e.target.value})}}/></div>
             <div><button onClick={(e)=>AddShowFunction(e)}>ADD MOVIE</button></div>
          </form>
      </div>
      </>
    )
}

export default AddShow