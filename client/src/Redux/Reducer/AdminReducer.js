import {
  ADD_SHOW_FAILURE,
  ADD_SHOW_SUCCESS,
  DELETE_SHOW_FAILURE,
  DELETE_SHOW_SUCCESS,
  EDIT_SHOW_FAILURE,
  EDIT_SHOW_SUCCESS,
  FETCH_ALL_SCREENS_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_SHOW_FAILURE,
  FETCH_SHOW_SUCCESS,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_SUCCESS,
  REMOVE_MOVIE_FAILURE,
  REMOVE_MOVIE_SUCCESS,
} from "../Action/AdminAction";
import { toast } from "sonner";

export const initialvalue = {
  admin: JSON.parse(localStorage.getItem("admin")) || {},
  session: "",
  screens: [],
  bookings: [],
  form: false,
  editshow:{}
};

export const AdminReducer = (state = initialvalue, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      localStorage.clear();
      toast.success("logout successfully");
      return { ...state, admin: {} };

    case LOGIN_ADMIN_SUCCESS:
      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      toast.success("login successfully");
      return { ...state, admin: action.payload.admin };

    case FETCH_ALL_SCREENS_SUCCESS:
      toast.success("show has been added");
      toast.success("fetch successfully");
      return { ...state, screens: action.payload.screens };


    case FETCH_BOOKINGS_FAILURE:
      toast.success("show has been added");
      return { ...state };
    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, bookings: action.payload.bookings };

      //show add, delete and edit
    case ADD_SHOW_SUCCESS:
      alert("show added");
      toast.success("show has been added");
      return { ...state };
    case ADD_SHOW_FAILURE:
      alert(action.payload.message);
      return state;
    case DELETE_SHOW_SUCCESS:
      alert(action.payload.message);
      return state;
    case DELETE_SHOW_FAILURE:
      alert(action.payload.message);
      return state;
    case EDIT_SHOW_SUCCESS:
      alert(action.payload.message);
      return state;
    case EDIT_SHOW_FAILURE:
      alert(action.payload.message);
      return state;

    case FETCH_SHOW_SUCCESS:
        return {...state,show:action.payload.show}
    case FETCH_SHOW_FAILURE:
        return state
    

    case REMOVE_MOVIE_SUCCESS:
      alert("movie has been deleted")
      return {...state}
    case REMOVE_MOVIE_FAILURE:
      alert("error exist try again")
      return state

    default:
      return state;
  }
};
