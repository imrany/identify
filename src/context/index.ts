import { createContext } from 'react'

type ContextType={
    details:{
        type:string,
        fullName:string,
        RegistrationNumber:string,
        IdNumber:string,
        yearOfEntry:string,
        yearOfExit:string,
        AcademicYear:string,
        Semester:number,
        campus:string,
        course:string,
        phoneNumber:number
    },
    API_URL:string,
    authenticate:any,
    showErrorDialog:any
}
export const GlobalContext=createContext<ContextType>({
    details:{
        type:"",
        fullName:"",
        RegistrationNumber:"",
        IdNumber:"",
        yearOfEntry:"",
        yearOfExit:"",
        AcademicYear:"",
        Semester:0,
        campus:"",
        course:"",
        phoneNumber:0,
    },
    API_URL:"",
    authenticate:()=>{},
    showErrorDialog:()=>{}
})
