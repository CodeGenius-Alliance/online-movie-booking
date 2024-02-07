import React, { createContext, useContext, useState } from 'react'

const AuthContext=createContext(null);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [token,setToken]=useState();
    const [isUser,setisUser]=useState(false);
    const [isAdmin,setisAdmin]=useState(false);
    const login=(user)=>{  //login
        setUser(user)
    }
    const verify=(token)=>{
        setToken(token)  //storing token which we got while login
    }
    const logout=()=>{
        setUser(null) //logout
    }
    const User=()=>{
        setisAdmin(false)
        setisUser(true)  //to check whether the client is user 
    }
    const Admin=()=>{
        setUser(false)
        setisAdmin(true) //to check whether the client is admin
    }
  return (
    <AuthContext.Provider value={{user,login,logout,token,verify,User,Admin,isAdmin,isUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuth(){
    return useContext(AuthContext)
}
