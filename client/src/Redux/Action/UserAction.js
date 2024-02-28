import axios from 'axios'


const base_url="http://localhost:3001/users"

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const REGISTER_USER_SUCCESS="REGISTER_USER_SUCCESS"
export const REGISTER_USER_FAILURE="REGISTER_USER_FAILURE"

export const BOOK_MOVIE_SUCCESS="REGISTER_USER_SUCCESS"
export const BOOK_MOVIE_FAILURE="REGISTER_USER_FAILURE"

export const FETCH_BOOK_MOVIE_SUCCESS="REGISTER_USER_SUCCESS"
export const FETCH_BOOK_MOVIE_FAILURE="REGISTER_USER_FAILURE"

export const CANCEL_MOVIE_SUCCESS="REGISTER_USER_SUCCESS"
export const CANCEL_MOVIE_FAILURE="REGISTER_USER_FAILURE"

export const LOGOUT_SUCCESS="LOGOUT_SUCCESS"

export const FETCH_SEATS_SUCCESS="FETCH_SEATS_SUCCESS"
export const FETCH_SEATS_FAILURE="FETCH_SEATS_FAILURE"



export const Loginuser = (userdetail) => async (dispatch) => {
 
  //login code -- working checked creating cookies also
  try {
    
    const response= await axios.post(base_url+'/login',userdetail,{withCredentials:true})
    console.log(response.data)
    dispatch({type:LOGIN_USER_SUCCESS,payload:{user:response.data.user,messege:response.data.messege}}) 
  } catch (error) {
    console.log(error)
    dispatch({type:LOGIN_USER_FAILURE,payload:{messege:error.response.data.messege}}) 
  }
};


export const Logout=()=>async(dispatch)=>{
  try {
    //api for backend session logout
    dispatch({type:LOGOUT_SUCCESS})
  } catch (error) {
    
  }
}


export const Registeruser = (userdetail) => async (dispatch) => {
  //register user code -- checked -- working

  try {
    const response= await axios.post(base_url+'/signup',userdetail)
    dispatch({type:REGISTER_USER_SUCCESS,payload:{user:response.user,messege:response.messege}}) 
  } catch (error) {
    dispatch({type:REGISTER_USER_FAILURE,payload:{messege:error.response.data.messege}}) 
  }
};

export const FetchShowSeats=({movie_id,screen_id,show_id})=>async(dispatch)=>{
  try {
    const response=await axios.get(base_url+`/getseats/${movie_id}/${screen_id}/${show_id}`,{withCredentials:true})
    //console.log("res",response.data.show.bookings)
    dispatch({type:FETCH_SEATS_SUCCESS,payload:{"messege":"ok",booking:response.data.show.bookings}})
  } catch (error) {
    dispatch({type:FETCH_SEATS_FAILURE})
  }
}

export const BookMovie=({movie_id,screen_id,show_id},seatsBooked)=>async(dispatch)=>{
    //book movie using movie id
    try {
        const response= await axios.post(base_url+'/bookMovie',{seats:seatsBooked,movie_id,screen_id,show_id},{withCredentials:true})
        
        dispatch({type:BOOK_MOVIE_SUCCESS,payload:{messege:response.messege}})
    } catch (error) {
      console.log(error)
        dispatch({type:BOOK_MOVIE_FAILURE,payload:{messege:error.response.data.messege}})
    }
}

export const FetchBookMovie=()=>async(dispatch)=>{
    try {
        const response= await axios.post(base_url+'/getBookedMovie')
        dispatch({type:FETCH_BOOK_MOVIE_SUCCESS,payload:{messege:response.messege,bookedmovie:response.movie}})
    } catch (error) {
        dispatch({type:FETCH_BOOK_MOVIE_FAILURE,payload:{messege:error.response.data.messege}})
    }
}

export const CancelMovieTickets=()=>async(dispatch)=>{
    try {
        const response= await axios.post(base_url+'/getBookedMovie')
        dispatch({type:CANCEL_MOVIE_SUCCESS,payload:{messege:response.messege,bookedmovie:response.movie}})
    } catch (error) {
        dispatch({type:CANCEL_MOVIE_FAILURE,payload:{messege:error.response.data.messege}})
    }
}

