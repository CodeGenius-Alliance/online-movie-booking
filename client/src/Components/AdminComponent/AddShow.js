import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewShow, FetchScreens } from '../../Redux/Action/AdminAction';
import './AddShow.css'
import {useNavigate, useParams} from 'react-router-dom'

function AddShow(props) {
    /*show:[{
        date:{type:Date},
        start_time:{type:String},
        end_time:{type:String},
        price:{type:String},
        bookings:[{
            user_id:{type:String},
            seats:{type:Array}
        }]
    }] 
    
    { date, , show_id, price, screen_id, movie_id }
    */
  
    const dispatch=useDispatch();
    const initialValue = {date:'', show_time:'',price:'',screen_id:'',movie_id:useParams().movie_id};
    const available_screens=useSelector((state)=>state.admin.screens)
 
    const [show,setShow]=useState(initialValue);
  
    const AddShowFunction=(e)=>{
      e.preventDefault()
      dispatch(AddNewShow(show));
    }

    console.log(initialValue)
    useEffect(()=>{
      dispatch(FetchScreens());
      console.log(available_screens)
    },[dispatch])
    const navigate=useNavigate();
  const admin=useSelector((state)=>state.admin.admin)
 if(admin && admin.email)
    return (
      <>
      <div className='container'>
          <h1>ADD SHOW DETAIL</h1>
          <form > 
             <div className='d-flex flex-wrap justify-content-between'><label htmlFor="Date">Date</label><input type="date" placeholder='Date' onChange={(e)=>{setShow({...show,date:e.target.value})}} /></div>     
             <div className='d-flex flex-wrap justify-content-between'><label htmlFor="Start date">show_time: </label><input type="time" placeholder='Start Time' onChange={(e)=>{setShow({...show,show_time:e.target.value})}}/></div>     
             <select name="" id="" onChange={(e)=>setShow({...show,screen_id:e.target.value})} >
             {available_screens?.map((screen)=><>
             
              <option value={screen?._id}>{screen?.screen_name}</option>
             
             </>)}
             </select>
             <div className='d-flex flex-wrap justify-content-between'><label htmlFor="Price">Price: </label><input type="Number" placeholder='Price' onChange={(e)=>{setShow({...show,price:e.target.value})}}/></div>
             <div><button onClick={(e)=>AddShowFunction(e)}>ADD SHOW</button></div>
          </form>
      </div>
      </>
    )
    else{
      navigate('/login')
    }
}

export default AddShow