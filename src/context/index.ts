import { createContext } from 'react'

type ContextType={
    details:{
        type:string,
        fullName:string,
        registrationNumber:string,
        idNumber:string,
        yearOfEntry:string,
        yearOfExit:string,
        academicYear:string,
        semester:number,
        campus:string,
        course:string,
        phoneNumber:number,
        school:string
    },
    API_URL:string,
    authenticate:any,
    showErrorDialog:any
}
export const GlobalContext=createContext<ContextType>({
    details:{
        type:"",
        fullName:"",
        registrationNumber:"",
        idNumber:"",
        yearOfEntry:"",
        yearOfExit:"",
        school:"",
        academicYear:"",
        semester:0,
        campus:"",
        course:"",
        phoneNumber:0,
    },
    API_URL:"",
    authenticate:()=>{},
    showErrorDialog:()=>{}
})
