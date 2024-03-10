
import { useNavigate } from "react-router-dom"
import { BOOK_MOVIE_FAILURE, BOOK_MOVIE_SUCCESS, CANCEL_MOVIE_FAILURE, CANCEL_MOVIE_SUCCESS, FETCH_BOOK_MOVIE_FAILURE, FETCH_BOOK_MOVIE_SUCCESS, FETCH_SEATS_FAILURE, FETCH_SEATS_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from "../Action/UserAction"

export const initialvalue={
    user:JSON.parse(localStorage.getItem('user')) ||{} ,
    session:'',
    movie:[],
    seats:{},
    booking:[],
    bookedmovies:[]
}

export const UserReducer=(state=initialvalue,action)=>{
    
    switch(action.type)
    {
        
       case LOGIN_USER_SUCCESS:
        localStorage.setItem('user',JSON.stringify(action.payload.user))
       
            return {...state,user:action.payload.user,session:true}

        case LOGIN_USER_FAILURE:
            alert(action.payload.messege)
            return state;

        case REGISTER_USER_SUCCESS:
            return state;

        case REGISTER_USER_FAILURE:
            alert(action.payload.messege)
            return state;

        case BOOK_MOVIE_SUCCESS:
            alert("tickets booked")
            return {...state,movie:[...state.movie,action.payload?.movie]}

        case BOOK_MOVIE_FAILURE:
            alert("error")
            return state

        case CANCEL_MOVIE_SUCCESS:
            alert("tickets cancel")
            return {...state,movie:[...state.movie,action.payload?.movie]}

        case CANCEL_MOVIE_FAILURE:
            alert("error")
            return state

        case FETCH_BOOK_MOVIE_SUCCESS:
            //console.log("booked movies are ",action.payload.bookedmovies)
            return {...state,bookedmovies:action.payload?.bookedmovies}

        case FETCH_BOOK_MOVIE_FAILURE:
            alert(action.payload.messege)
            return state

        case LOGOUT_SUCCESS:
            localStorage.clear();
            return {state,user:{}};

        case FETCH_SEATS_SUCCESS:
            return {...state,booking:action.payload?.booking}
            
        case FETCH_SEATS_FAILURE:
            return {...state}
        default:
            return state;
    }

}