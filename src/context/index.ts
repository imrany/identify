import { createContext } from 'react'

type ContextType={
    details:any,
    API_URL:string,
    sendPhoto:any,
    showErrorDialog:any
}
export const GlobalContext=createContext<ContextType>({
    details:{},
    API_URL:"",
    sendPhoto:()=>{},
    showErrorDialog:()=>{}
})
