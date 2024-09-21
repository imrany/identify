import { GlobalContext } from "../context";
import { useContext, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function Admin(){
    const { API_URL, showErrorDialog }=useContext(GlobalContext);

    function formattedDate(dateString:string){
        return new Date(dateString).toLocaleString('en-US',{
            timeZoneName:'short'
        });
    }

    async function trackAccess(){
        try{
            let url=`${API_URL}/api/admin/track_access`
            let response=await fetch(url)
            let parseRes=await response.json()
            if(parseRes.error){
                showErrorDialog("Error",`${parseRes.error}`)
            }else{
                console.log(parseRes.data)
                console.log(formattedDate(parseRes.data[4].access_time))
            }
        }catch(error:any){
            showErrorDialog("Error",`${error.message}`)
            console.log(error.message)
        }
    }
    
    useEffect(()=>{
        trackAccess()
    },[])
    return(
        <div className="flex flex-col p-3 max-h-screen bg-[var(--primary-01)]">
            <div className="flex px-2 justify-center items-center">
                <FaChevronLeft className="w-[15px] h-[15px]"/>
                <p className="text-base ml-auto">Access records</p>
            </div>
            Admin
        </div>
    )
}
