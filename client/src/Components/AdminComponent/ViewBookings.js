import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FetchBooking } from '../../Redux/Action/AdminAction';

function ViewBookings() {
    const { movie_id, screen_id, show_id }=useParams();
    const AllBookings=useSelector((state)=>state.admin.bookings)
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(FetchBooking({movie_id,screen_id,show_id}))
    },[])
  return (
   <>
   {AllBookings?<>
   {/* map all the bookings */}
   </>:<>
   <div>NO BOOKINGS </div>
   </>}
   </>
  )
}

export default ViewBookings