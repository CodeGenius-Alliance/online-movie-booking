import { FECTH_ONE_MOVIE_FAILURE, FETCH_ALL_MOVIES_FAILURE, FETCH_ALL_MOVIES_SUCCESS, FETCH_ONE_MOVIE_SUCCESS } from "../Action";
import { toast } from 'sonner'
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
            toast.success("fetched movies")
            return {...state,movies:action.payload.movies,oneMovie:{}}
        case FETCH_ALL_MOVIES_FAILURE:
            toast.error("reload")
            return {...state,oneMovie:{}};
        case FETCH_ONE_MOVIE_SUCCESS:
            return {...state,oneMovie:action.payload.oneMovie}
        case FECTH_ONE_MOVIE_FAILURE:
            return {...state,oneMovie:{}}
        default :
            return {...state};
    }
}