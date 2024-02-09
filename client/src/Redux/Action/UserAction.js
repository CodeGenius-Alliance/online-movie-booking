import axios from 'axios'

const base_url="http:localhost:3000/users"

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


export const Loginuser = (userdetail) => async (dispatch) => {
  //login code
  try {
    const response= await axios.post(base_url+'/login',userdetail)
    dispatch({type:LOGIN_USER_SUCCESS,payload:{user:response.user,messege:response.messege}}) 
  } catch (error) {
    dispatch({type:LOGIN_USER_FAILURE,payload:{messege:error.response.data.messege}}) 
  }
};

export const Registeruser = (userdetail) => async (dispatch) => {
  //register user code
  try {
    const response= await axios.post(base_url+'/signup',userdetail)
    dispatch({type:REGISTER_USER_SUCCESS,payload:{user:response.user,messege:response.messege}}) 
  } catch (error) {
    dispatch({type:REGISTER_USER_FAILURE,payload:{messege:error.response.data.messege}}) 
  }
};

export const BookMovie=(moviedetail)=>async(dispatch)=>{
    //book movie using movie id
    try {
        const response= await axios.post(base_url+'/bookMovie',moviedetail)
        dispatch({type:BOOK_MOVIE_SUCCESS,payload:{messege:response.messege}})
    } catch (error) {
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
