import axios from "axios"

const base_url="http:localhost:3001/users"

export const FETCH_ALL_MOVIES_SUCCESS="FETCH_ALL_MOVIES_SUCCESS"
export const FETCH_ALL_MOVIES_FAILURE="FETCH_ALL_MOVIES_FAILURE"

export const FETCH_ONE_MOVIE_SUCCESS="FETCH_ONE_MOVIE_SUCCESS"
export const FECTH_ONE_MOVIE_FAILURE="FETCH_ONE_MOVIE_FAILURE"

export const FetchAllMovies=()=>async(dispatch)=>{
    
    try {
       
        const response=await (await axios.get('http://localhost:3001/users/getAllMovies'))
        dispatch({type:FETCH_ALL_MOVIES_SUCCESS,payload:{messege:response.data.messege,movies:response.data.movies}})
    } catch (error) {
        
        dispatch({type:FETCH_ALL_MOVIES_FAILURE})
    }
}

export const FetchOneMovie=(movie_id)=>async(dispatch)=>{
    try {
        const response=await axios.get(base_url+'/getOneMovie',{movie_id:movie_id})
        dispatch({type:FETCH_ONE_MOVIE_SUCCESS,payload:{messege:response.data.messege,oneMovie:response.data.movie}})
    } catch (error) {
        dispatch({type:FECTH_ONE_MOVIE_FAILURE})
    }
}