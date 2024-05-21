import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewScreen } from '../../Redux/Action/AdminAction';
import { useNavigate } from 'react-router-dom';

function AddScreen() {
    const initialValue = {screen_name:'',no_of_rows:0,no_of_columns:0};
    const [screen,setScreen]=useState(initialValue);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const AddScreenFunction=(e)=>{
        e.preventDefault();
        dispatch(AddNewScreen(screen))
        navigate('/')
    }
   
  const admin=useSelector((state)=>state.admin.admin)
 if(admin && admin.email)
    return (
        <>
        <div className='container'>
            <h1>ADD SCREEN DETAIL</h1>
            <form >
                
               <div className='d-flex flex-wrap justify-content-between'><label htmlFor="title">Screen Name: </label><input type="text" placeholder='Screen Name' onChange={(e)=>{setScreen({...screen,screen_name:e.target.value})}} /></div>     
               <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie detail">Rows: </label><input type="Number" placeholder='Number of Rows' onChange={(e)=>{setScreen({...screen,no_of_rows:e.target.value})}}/></div>     
               <div className='d-flex flex-wrap justify-content-between'><label htmlFor="movie detail">Columns: </label><input type="Number" placeholder='Number of  Columns' onChange={(e)=>{setScreen({...screen,no_of_columns:e.target.value})}}/></div>     
               <div><button className="btn-full" onClick={(e)=>AddScreenFunction(e)}>ADD SCREEN</button></div>
            </form>
        </div>
        </>
      )
      else
      {
        navigate('/login')
      }
}

export default AddScreen