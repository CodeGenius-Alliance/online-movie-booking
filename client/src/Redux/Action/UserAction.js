import axios from 'axios'


const base_url="http://localhost:3001/users"

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const REGISTER_USER_SUCCESS="REGISTER_USER_SUCCESS"
export const REGISTER_USER_FAILURE="REGISTER_USER_FAILURE"

export const BOOK_MOVIE_SUCCESS="BOOK_MOVIE_SUCCESS"
export const BOOK_MOVIE_FAILURE="BOOK_MOVIE_FAILURE"

export const FETCH_BOOK_MOVIE_SUCCESS="FETCH_BOOK_MOVIE_SUCCESS"
export const FETCH_BOOK_MOVIE_FAILURE="FETCH_BOOK_MOVIE_FAILURE"

export const CANCEL_MOVIE_SUCCESS="CANCEL_MOVIE_SUCCESS"
export const CANCEL_MOVIE_FAILURE="CANCEL_MOVIE_FAILURE"

export const LOGOUT_SUCCESS="LOGOUT_SUCCESS"

export const FETCH_SEATS_SUCCESS="FETCH_SEATS_SUCCESS"
export const FETCH_SEATS_FAILURE="FETCH_SEATS_FAILURE"

export const DETAIL_MOVIE_SUCCESS="DETAIL_MOVIE_SUCCESS"
export const DETAIL_MOVIE_FAILURE="DETAIL_MOVIE_FAILURE"

export const FETCH_ONE_SHOW_SUCCESS="FETCH_ONE_SHOW_SUCCESS"
export const FETCH_ONE_SHOW_FAILURE="FETCH_ONE_SHOW_FAILURE"

export const Loginuser = (userdetail) => async (dispatch) => {
 
  //login code -- working checked creating cookies also
  try {
    
    const response= await axios.post(base_url+'/login',userdetail,{withCredentials:true})
    //console.log(response.data)
    dispatch({type:LOGIN_USER_SUCCESS,payload:{user:response.data?.user,message:response.data?.message}}) 
  } catch (error) {
    // console.log(error)
    dispatch({type:LOGIN_USER_FAILURE,payload:{message:error.response.data.message}}) 
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
    dispatch({type:REGISTER_USER_SUCCESS,payload:{user:response.data.user,message:response.data.message}}) 
  } catch (error) {
    dispatch({type:REGISTER_USER_FAILURE,payload:{message:error.response.data.message}}) 
  }
};

export const FetchOneShow=({movie_id,screen_id,show_id})=>async(dispatch)=>{
  try {
    const response=await axios.get(base_url+`/getshow/${movie_id}/${screen_id}/${show_id}`,{withCredentials:true})
    //console.log("res",response.data.show.bookings)
    dispatch({type:FETCH_ONE_SHOW_SUCCESS,payload:{"message":"ok",show:response.data?.show}})
  } catch (error) {
    dispatch({type:FETCH_ONE_SHOW_FAILURE})
  }
}
export const FetchShowSeats=({movie_id,screen_id,show_id})=>async(dispatch)=>{
  try {
    const response=await axios.get(base_url+`/getseats/${movie_id}/${screen_id}/${show_id}`,{withCredentials:true})
    //console.log("res",response.data.show.bookings)
    dispatch({type:FETCH_SEATS_SUCCESS,payload:{"message":"ok",booking:response.data?.show?.bookings}})
  } catch (error) {
    dispatch({type:FETCH_SEATS_FAILURE})
  }
}

export const FetchMovieDetail=({movie_id,screen_id,show_id})=>async(dispatch)=>{
  //book movie using movie id
  try {
      const response= await axios.get(base_url+'/bookMovieDetail',{movie_id,screen_id,show_id},{withCredentials:true})
     console.log(response)
      dispatch({type:DETAIL_MOVIE_SUCCESS,payload:{message:response.data.message}})
  } catch (error) {
    console.log(error)
      dispatch({type:DETAIL_MOVIE_FAILURE,payload:{message:error.response.data.message}})
  }
}
export const BookMovie=({movie_id,screen_id,show_id,movie_name,show_date,screen_name},seatsBooked)=>async(dispatch)=>{
    //book movie using movie id
    try {
        const response= await axios.post(base_url+'/bookMovie',{seats:seatsBooked,movie_id,screen_id,show_id,movie_name,show_date,screen_name},{withCredentials:true})
       
        dispatch({type:BOOK_MOVIE_SUCCESS,payload:{message:response.data.message}})
    } catch (error) {
      console.log(error)
        dispatch({type:BOOK_MOVIE_FAILURE,payload:{message:error.response.data.message}})
    }
}

export const FetchBookMovie=()=>async(dispatch)=>{
    try {
        const response=(await axios.get(base_url+'/getBookedMovie',{withCredentials:true}))
       console.log("hi ",response.data.bookedmovies)
        dispatch({type:FETCH_BOOK_MOVIE_SUCCESS,payload:{message:response.data.message,bookedmovies:response.data.bookedmovies}})
    } catch (error) {
      console.log(error)
        dispatch({type:FETCH_BOOK_MOVIE_FAILURE,payload:{message:error.response.data.message}})
    }
}

export const CancelMovieTickets=(detail)=>async(dispatch)=>{
    try {
        const response= await axios.post(base_url+'/cancelTickets',detail,{withCredentials:true})
        dispatch({type:CANCEL_MOVIE_SUCCESS,payload:{message:response.data.message,bookedmovie:response.data.bookedmovies}})
    } catch (error) {
        dispatch({type:CANCEL_MOVIE_FAILURE,payload:{message:error.response.data.message}})
    }
}

