import { FECTH_ONE_MOVIE_FAILURE, FETCH_ALL_MOVIES_FAILURE, FETCH_ALL_MOVIES_SUCCESS, FETCH_ONE_MOVIE_SUCCESS } from "../Action";

const initialValue={
    movies:[],
    screen:null,
    oneMovie:{}
}

export const CommonReducer=(state=initialValue,action)=>
{
    switch(action.type)
    {
        case FETCH_ALL_MOVIES_SUCCESS:
            return {...state,movies:action.payload.movies}
        case FETCH_ALL_MOVIES_FAILURE:
            return state;
        case FETCH_ONE_MOVIE_SUCCESS:
            return {...state,oneMovie:action.payload.oneMovie}
        case FECTH_ONE_MOVIE_FAILURE:
            return state
        default :
            return state;
    }
}