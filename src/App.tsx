import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ScanPage from "./pages/ScanPage";
import NotFound from "./pages/NotFound";
import NotSupported from "./components/NotSupported";
import OfflinePage from "./components/OfflinePage";
import { GlobalContext } from "./context";
import { Error } from "./components/dialogs";
import { openDialog } from "./components/actions"

function App() {
    const API_URL = "https://qr-pay-server.onrender.com";
    //const API_URL = "http://localhost:8080";
    const [isSupported,setIsSupported]=useState(true);
    const [isOnline,setIsOnline]=useState(navigator.onLine);
    const [details,setDetails]=useState({
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
    })
    const [isScanned,setIsScanned]=useState(false);
    const [error,setError]=useState({
        type:"",
        message:""
    })

    function showErrorDialog(type:string,message:string){
        setError({
            type,
            message
        })
        openDialog("error_dialog")
    }

    function connectionStatus(){
        if(navigator.onLine===false){
            setIsOnline(false)
            showErrorDialog("Error","You are offline")
        }
    }

    async function authenticate(isScanned:boolean,registration_number:string) {
        try {
            const url=isScanned?`${API_URL}/api/identify/${registration_number}`:"";
            const response=await fetch(url,{
                method:"GET"
            })
            const parseRes = await response.json();
            if (parseRes.error) {
                console.log(parseRes.error)
                setIsScanned(false);
                showErrorDialog("Error",parseRes.error)
            } else {
                const userDetails = {
                    type:parseRes.data.type,
                    fullName:parseRes.data.full_name,
                    RegistrationNumber:parseRes.data.registration_number,
                    IdNumber:parseRes.data.id_number,
                    yearOfEntry:parseRes.data.year_of_entry,
                    yearOfExit:parseRes.data.year_of_exit,
                    AcademicYear:parseRes.data.academic_year,
                    Semester:parseRes.data.semester,
                    campus:parseRes.data.campus,
                    course:parseRes.data.course,
                    phoneNumber:parseRes.data.phone_number
                }
                setDetails(userDetails);
                setIsScanned(true);
            }
        }catch(error:any){
            setIsScanned(false);
            let errorMessage=error.message.includes("Failed to fetch")?"No connection":error.message
            showErrorDialog("Error",errorMessage)
            console.log(errorMessage)
        }
    }

    window.onresize=function(){
        screen.width>450?setIsSupported(false):setIsSupported(true)
    }

    useEffect(()=>{
        screen.width>450?setIsSupported(false):setIsSupported(true)
        connectionStatus()
    },[screen.width,isOnline])
  return (
    <>
        {isSupported?(
            <>
                {isOnline?(
                    <BrowserRouter>
                        <GlobalContext.Provider value={{ details, API_URL, authenticate, showErrorDialog }}>
                            <Routes>
                                <Route path="/" element={<ScanPage/>}/>
                                <Route path="/details" element={isScanned?<DetailPage/>:<Navigate to="/"/>}/>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </GlobalContext.Provider>
                        <Error data={error}/>
                    </BrowserRouter>
                ):(
                    <OfflinePage/>
                )}
            </>
        ):(
            <NotSupported/>    
        )}
    </>
  )
}

export default App
