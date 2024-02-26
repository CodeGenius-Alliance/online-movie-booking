import axios from 'axios'

const base_url="http://localhost:3001/admins"
const movie_url="http://localhost:3001/movies"
const screen_url="http://localhost:3001/screens"
const shows_url="http://localhost:3001/shows"


export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";

export const FETCH_ALL_SCREENS_SUCCESS ="FETCH_ALL_SCREENS_SUCCESS"
export const FETCH_ALL_SCREENS_FAILURE ="FETCH_ALL_SCREENS_FAILURE"

export const FETCH_ONE_SCREEN_SUCCESS ="FETCH_ONE_SCREEN_SUCCESS"
export const FETCH_ONE_SCREEN_FAILURE ="FETCH_ONE_SCREEN_FAILURE"

export const FETCH_ALL_SHOWS_SUCCESS ="FETCH_ALL_SHOWS_SUCCESS"
export const FETCH_ALL_SHOWS_FAILURE ="FETCH_ALL_SHOWS_FAILURE"

export const ADD_SCREEN_SUCCESS="ADD_SCREEN_SUCCESS"
export const ADD_SCREEN_FAILURE="ADD_SCREEN_FAILURE"

export const REMOVE_SCREEN_SUCCESS="REMOVE_SCREEN_SUCCESS"
export const REMOVE_SCREEN_FAILURE="REMOVE_SCREEN_FAILURE"

export const ADD_SHOW_SUCCESS="ADD_SHOW_SUCCESS"
export const ADD_SHOW_FAILURE="ADD_SHOW_FAILURE"

export const REMOVE_SHOW_SUCCESS="REMOVE_SHOW_SUCCESS"
export const REMOVE_SHOW_FAILURE="REMOVE_SHOW_FAILURE"

export const ADD_MOVIE_SUCCESS="ADD_MOVIE_SUCCESS"
export const ADD_MOVIE_FAILURE="ADD_MOVIE_FAILURE"

export const REMOVE_MOVIE_SUCCESS="REMOVE_MOVIE_SUCCESS"
export const REMOVE_MOVIE_FAILURE="REMOVE_MOVIE_FAILURE"

export const FETCH_BOOKINGS_SUCCESS="FETCH_BOOKINGS_SUCCESS"
export const FETCH_BOOKINGS_FAILURE="FETCH_BOOKINGS_FAILURE"

export const LOGOUT_SUCCESS="LOGOUT_SUCCESS"
/*admin login */
export const Loginadmin = (admindetail) => async (dispatch) => {
  try {
    const response= await (await axios.post(base_url+'/login',admindetail,{withCredentials:true}))
    console.log(response.data)
    dispatch({type:LOGIN_ADMIN_SUCCESS,payload:{admin:response.data.admin,messege:response.data.messege}}) 
  } catch (error) {
    console.log(error)
    dispatch({type:LOGIN_ADMIN_FAILURE,payload:{messege:error.response.data.messege}}) 
  }
};
export const LogoutAdmin=()=>async(dispatch)=>{
  try {
    //api for backend session logout
    dispatch({type:LOGOUT_SUCCESS})
  } catch (error) {
    
  }
}


/* all the functions related to screens -- working -- checked */
export const FetchScreens=()=>async(dispatch)=>{
  try {
    const response=await (await axios.get(screen_url+'/allscreens',{withCredentials:true}))
    console.log("fetch screens for dropdown ",response.data)
    dispatch({type:FETCH_ALL_SCREENS_SUCCESS,payload:{"messege":"get aa screens",screens:response.data.screens}})
  } catch (error) {
    console.log(error)
  }
}
export const FetchOneScreen=(screen_id)=>async(dispatch)=>{
  try {
    const response=await axios.get(screen_url+`/getScreen/${screen_id}`)
    dispatch({type:FETCH_ONE_SCREEN_SUCCESS,payload:{"messege":response.data.messege}})
  } catch (error) {
    dispatch({type:FETCH_ONE_SCREEN_FAILURE})
  }

}

/* checked -- working */
export const AddNewScreen=(screen_detail)=>async(dispatch)=>{
  //done
  try {
    const response=await axios.post(screen_url+'/addScreen',screen_detail,{withCredentials:true})
    console.log("res",response);
    dispatch({type:ADD_SCREEN_SUCCESS,payload:{messege:response.data.messege}})
  } catch (error) {
    console.log(error)
    dispatch({type:ADD_SCREEN_FAILURE})
    
  }

}
export const EditScreen=(screen_id,screen_detail)=>async(dispatch)=>{
  
}
export const DeleteScreen=(screen_id)=>async(dispatch)=>{
  
}

/* all the functions related to the shows */
export const FetchShows=(movieid)=>async(dispatch)=>{
try {
  const response=await axios.get(shows_url+`getShowbyMovieId/${movieid}`)
  console.log("fetch shows",response)
  dispatch({type:FETCH_ALL_SHOWS_SUCCESS,payload:{"messege":response.data.messege}})
} catch (error) {
  dispatch({type:FETCH_ALL_SHOWS_FAILURE})
}
}

export const FetchShow=(movie_id)=>async(dispatch)=>{
  
}

/* checked working */
export const AddNewShow=(show_detail)=>async(dispatch)=>{
  try {
    const response=await axios.post(shows_url+'/addShow',show_detail,{withCredentials:true})
    console.log("add new show",response.data)
    dispatch({type:ADD_SHOW_SUCCESS,payload:{"messege":response.data.messege}})
  } catch (error) {
  
  }

}
export const EditShow=(movie_id,show_id,show_detail)=>async(dispatch)=>{
  
}
export const DeleteShow=(show_id)=>async(dispatch)=>{
  
}

/* all the functions related to the movies -- checked--done */
export const AddNewMovie=(movie_detail)=>async(dispatch)=>{
  //add a new movie
  try {
    const response=await axios.post(movie_url+'/addMovie',movie_detail,{withCredentials:true})
    console.log("add movie",response)
    dispatch({type:ADD_MOVIE_SUCCESS,payload:{messege:response.data.messege}})
  } catch (error) {
    console.log(error)
    dispatch({type:ADD_MOVIE_FAILURE})
  }

}
export const EditMovie=(movie_id,movie_detail)=>async(dispatch)=>{
  
}
export const DeleteMovie=(movie_id)=>async(dispatch)=>{
  
}

export const FetchBooking=(data)=>async(dispatch)=>{
  try {
    const response=await axios.get(shows_url+'viewBookings',data);
    console.log("fetch booking admin",response);
    dispatch({type:FETCH_BOOKINGS_SUCCESS,payload:{messege:response.data.messege,bookings:response.data.bookings}})

  } catch (error) {
    dispatch({type:FETCH_BOOKINGS_FAILURE})
  }

}