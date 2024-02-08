import axios from 'axios'

const base_url="http:localhost:3000/users"

const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";


export const Loginuser = (userdetail) => async (dispatch) => {
  //myuser login with backend using axios api
  try {
    const response= await axios.post(base_url+'/login',userdetail) 
  } catch (error) {

  }
};

export const Registeruser = (admindetail) => async (dispatch) => {
  //login admin code
};
