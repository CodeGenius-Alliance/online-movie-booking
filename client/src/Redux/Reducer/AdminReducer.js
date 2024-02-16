import { FETCH_ALL_SCREENS_SUCCESS, FETCH_BOOKINGS_FAILURE, LOGIN_ADMIN_SUCCESS } from "../Action/AdminAction"

export const initialvalue={
    admin:JSON.parse(localStorage.getItem('admin'))||{},
    session:'',
    screens:[],
    bookings:[]
}

export const AdminReducer=(state=initialvalue,action)=>{
    switch(action.type)
    {
        case LOGIN_ADMIN_SUCCESS:
            localStorage.setItem('admin',JSON.stringify(action.payload.admin))
            return {...state,admin:action.payload.admin}
        case FETCH_ALL_SCREENS_SUCCESS:
            return {...state,screens:action.payload.screens}

        case FETCH_BOOKINGS_FAILURE:
            return {...state,bookings:action.payload.bookings}

        
        default:
            return state
    }

}