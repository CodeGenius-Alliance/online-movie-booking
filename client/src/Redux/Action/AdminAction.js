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

export const DELETE_SHOW_SUCCESS="DELETE_SHOW_SUCCESS"
export const DELETE_SHOW_FAILURE="DELETE_SHOW_FAILURE"

export const EDIT_SHOW_SUCCESS="EDIT_SHOW_SUCCESS"
export const EDIT_SHOW_FAILURE="EDIT_SHOW_FAILURE"

export const FETCH_SHOW_SUCCESS="FETCH_SHOW_SUCCESS"
export const FETCH_SHOW_FAILURE="FETCH_SHOW_FAILURE"
export const LOGOUT_SUCCESS="LOGOUT_SUCCESS"
/*admin login */
export const Loginadmin = (admindetail) => async (dispatch) => {
  try {
    const response= await (await axios.post(base_url+'/login',admindetail,{withCredentials:true}))
    console.log(response.data)
    dispatch({type:LOGIN_ADMIN_SUCCESS,payload:{admin:response.data.admin,message:response.data.message}}) 
  } catch (error) {
    console.log(error)
    dispatch({type:LOGIN_ADMIN_FAILURE,payload:{message:error.response.data.message}}) 
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
    dispatch({type:FETCH_ALL_SCREENS_SUCCESS,payload:{"message":"get aa screens",screens:response.data.screens}})
  } catch (error) {
    console.log(error)
  }
}
export const FetchOneScreen=(screen_id)=>async(dispatch)=>{
  try {
    const response=await axios.get(screen_url+`/getScreen/${screen_id}`)
    dispatch({type:FETCH_ONE_SCREEN_SUCCESS,payload:{"message":response.data.message}})
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
    dispatch({type:ADD_SCREEN_SUCCESS,payload:{message:response.data.message}})
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
  dispatch({type:FETCH_ALL_SHOWS_SUCCESS,payload:{"message":response.data.message}})
} catch (error) {
  dispatch({type:FETCH_ALL_SHOWS_FAILURE})
}
}

export const FetchOneShow=(show_detail)=>async(dispatch)=>{
  console.log(show_detail)
  try {
    const response=await axios.post(shows_url+'/fetchShow',show_detail,{withCredentials:true})
    console.log("fetche show",response.data)
    dispatch({type:FETCH_SHOW_SUCCESS,payload:{"message":response.data.message,show:response.data.show}})
  } catch (error) {
     console.log("err",error)
     dispatch({type:FETCH_SHOW_FAILURE,payload:{"message":error.response.data.message}})
  }
  
}

/* checked working */
export const AddNewShow=(show_detail)=>async(dispatch)=>{
  try {
    const response=await axios.post(shows_url+'/addShow',show_detail,{withCredentials:true})
    console.log("add new show",response.data)
    dispatch({type:ADD_SHOW_SUCCESS,payload:{"message":response.data.message}})
  } catch (error) {
     console.log(error)
     dispatch({type:ADD_SHOW_FAILURE,payload:{"message":error.response.data.message}})
  }

}
export const EditShowPrice=(show_detail)=>async(dispatch)=>{
  try {
   
    const response=await axios.post(shows_url+'/editShow',show_detail,{withCredentials:true})
    console.log("delete show",response)
    dispatch({type:EDIT_SHOW_SUCCESS,payload:{message:response.data.message,movie:response.data.movie}})
  } catch (error) {
    console.log(error)
    dispatch({type:EDIT_SHOW_FAILURE})
  }
  
}
export const DeleteShow=(show)=>async(dispatch)=>{
  try {
    console.log(show)
    const response=await axios.post(shows_url+'/deleteShow',show,{withCredentials:true})
    console.log("delete show",response)
    dispatch({type:DELETE_SHOW_SUCCESS,payload:{message:response.data.message,movie:response.data.movie}})
  } catch (error) {
    console.log(error)
    dispatch({type:DELETE_SHOW_FAILURE})
  }
}

/* all the functions related to the movies -- checked--done */
export const AddNewMovie=(movie_detail)=>async(dispatch)=>{
  //add a new movie
  try {
    const response=await axios.post(movie_url+'/addMovie',movie_detail,{withCredentials:true})
    console.log("add movie",response)
    dispatch({type:ADD_MOVIE_SUCCESS,payload:{message:response.data.message}})
  } catch (error) {
    console.log(error)
    dispatch({type:ADD_MOVIE_FAILURE})
  }

}
export const EditMovie=(movie_id,movie_detail)=>async(dispatch)=>{
  
}
export const DeleteMovie=(movie_id)=>async(dispatch)=>{
  console.log(movie_id)
  try {
    const response=await axios.post(movie_url+'/deleteMovie',{movie_id:movie_id},{withCredentials:true})
    console.log("add movie",response)
    dispatch({type:REMOVE_MOVIE_SUCCESS,payload:{message:response.data.message,movies:response.data.movies}})
  } catch (error) {
    console.log(error)
    dispatch({type:REMOVE_SCREEN_FAILURE})
  }
}

export const FetchBooking=({...params})=>async(dispatch)=>{
  try {
    const response=await (await axios.post(`http://localhost:3001/shows/viewBookings`,params,{withCredentials:true}))
    console.log("fetch booking admin",response);
    dispatch({type:FETCH_BOOKINGS_SUCCESS,payload:{message:response.data.message,bookings:response.data.bookings}})

  } catch (error) {
    console.log(error)
    dispatch({type:FETCH_BOOKINGS_FAILURE})
  }

}