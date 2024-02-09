import axios from 'axios'

const base_url="http:localhost:3000/admin"
const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";

export const Loginadmin = (admindetail) => async (dispatch) => {
  try {
    const response= await axios.post(base_url+'/login',admindetail)
    dispatch({type:LOGIN_ADMIN_SUCCESS,payload:{user:response.user,messege:response.messege}}) 
  } catch (error) {
    dispatch({type:LOGIN_ADMIN_FAILURE,payload:{messege:error.response.data.messege}}) 
  }
};


