import { GlobalContext } from "../context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import User from "../assets/user.png"; 
import BellNotification from "../assets/sounds/bell-notification.wav"; 

export default function Admin(){
    const navigate=useNavigate()
    const { API_URL, showErrorDialog }=useContext(GlobalContext);
    const [accessRecord,setAccessRecord]=useState([])
    const [reload,setReload]=useState(0)

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
                let sorted=parseRes.data
                sorted.sort((a:any,b:any)=>{
                    let x = b.access_time.toLowerCase();
                    let y = a.access_time.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                })
                sorted.length!==accessRecord.length?new Audio(BellNotification).play():""
                console.log(sorted)
                setAccessRecord(sorted)
            }
        }catch(error:any){
            showErrorDialog("Error",`${error.message}`)
            console.log(error.message)
        }
    }
   
    setInterval(()=>{
        setReload(reload=>reload+1)
    },500)

    useEffect(()=>{
        trackAccess()
    },[reload])
    return(
        <div className="flex flex-col p-3 max-h-screen bg-[var(--primary-01)]">
            {accessRecord.length!==0?(
                <>
                    <div className="flex justify-center items-center px-2">
                        <FaChevronLeft onClick={()=>navigate(-1)} className="w-[18px] h-[18px]"/>
                        <p className="text-lg ml-auto">Access record</p>
                    </div>
                    <div className="pb-3 pt-12">
                        <p className="text-xl font-semibold mx-2">{accessRecord.length} access</p>
                        <div className="flex flex-col mt-2">
                            {accessRecord&&accessRecord.map((access:any, index:any)=>(
                                <div key={index} className="flex h-[70px] items-center gap-2 p-2">
                                    <img src={User} className="rounded-[20px] object-fit h-[50px] w-[50px]" alt="Student's image"/>
                                    <div className="flex-grow flex flex-col gap-1">
                                        <p className="font-semibold">{access.registration_number}</p>
                                        <p className="text-sm text-[var(--primary-03)] uppercase">{formattedDate(access.access_time)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ):(
                <div className="h-screen flex items-center justify-center">
                    <p>No access record</p>
                </div>
            )}
        </div>
    )
}
