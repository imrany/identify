import { createContext } from 'react'

type ContextType={
    user:{
        username:string,
        accessToken:string,
        phoneNumber:number
    },
    API_URL:string
}
export const GlobalContext=createContext<ContextType>({
    user:{
        username:"",
        accessToken:"",
        phoneNumber:0,
    },
    API_URL:""
})
