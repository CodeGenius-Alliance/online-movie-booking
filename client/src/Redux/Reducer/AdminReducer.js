import { ADD_SHOW_SUCCESS, FETCH_ALL_SCREENS_SUCCESS, FETCH_BOOKINGS_FAILURE, LOGIN_ADMIN_SUCCESS, LOGOUT_SUCCESS } from "../Action/AdminAction"
import { toast } from 'sonner'

export const initialvalue={
    admin:JSON.parse(localStorage.getItem('admin'))||{},
    session:'',
    screens:[],
    bookings:[],
    form:false
}

export const AdminReducer=(state=initialvalue,action)=>{
    
    switch(action.type)
    {
        case LOGOUT_SUCCESS:
            localStorage.clear();
            toast.success("logout successfully")
            return {...state,admin:{}}

        case LOGIN_ADMIN_SUCCESS:
            localStorage.setItem('admin',JSON.stringify(action.payload.admin))
            toast.success("login successfully")
            return {...state,admin:action.payload.admin}

        case FETCH_ALL_SCREENS_SUCCESS:
            toast.success("show has been added")
            toast.success("fetch successfully")
            return {...state,screens:action.payload.screens}

        case FETCH_BOOKINGS_FAILURE:
            toast.success("show has been added")
            return {...state,bookings:action.payload.bookings}

        case ADD_SHOW_SUCCESS:
            toast.success("show has been added")
            
            return {...state};

        
        default:
            return state
    }

}