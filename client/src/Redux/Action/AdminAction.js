import axios from 'axios'

const base_url="http:localhost:3001/admin"
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

/*admin login */
export const Loginadmin = (admindetail) => async (dispatch) => {
  try {
    const response= await axios.post(base_url+'/login',admindetail)
    dispatch({type:LOGIN_ADMIN_SUCCESS,payload:{user:response.user,messege:response.messege}}) 
  } catch (error) {
    dispatch({type:LOGIN_ADMIN_FAILURE,payload:{messege:error.response.data.messege}}) 
  }
};

/* all the functions related to screens */
export const FetchScreens=()=>async(dispatch)=>{
  try {
    
  } catch (error) {
    
  }
}
export const FetchOneScreen=(screen_id)=>async(dispatch)=>{

}
export const AddNewScreen=(screen_detail)=>async(dispatch)=>{

}
export const EditScreen=(screen_id,screen_detail)=>async(dispatch)=>{
  
}
export const DeleteScreen=(screen_id)=>async(dispatch)=>{
  
}

/* all the functions related to the shows */
export const FetchShows=(movie_id)=>async(dispatch)=>{

}
export const AddNewShow=(show_detail)=>async(dispatch)=>{

}
export const EditShow=(movie_id,show_id,show_detail)=>async(dispatch)=>{
  
}
export const DeleteShow=(show_id)=>async(dispatch)=>{
  
}

/* all the functions related to the movies */
export const AddNewMovie=(movie_detail)=>async(dispatch)=>{

}
export const EditMovie=(movie_id,movie_detail)=>async(dispatch)=>{
  
}
export const DeleteMovie=(movie_id)=>async(dispatch)=>{
  
}

export const FetchBooking=(data)=>async(dispatch)=>{}