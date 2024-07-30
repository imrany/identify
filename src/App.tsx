import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ScanPage from "./pages/ScanPage";
import NotFound from "./pages/NotFound";
import NotSupported from "./components/NotSupported";
import { GlobalContext } from "./context";
import { Error } from "./components/dialogs";
import { openDialog } from "./components/actions"

function App() {
    const API_URL = "https://qr-pay-server.onrender.com";
    //const API_URL = "http://localhost:8080";
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

    async function authenticate(isScanned:boolean,id:string) {
        try {
            const url=isScanned?`${API_URL}/api/authenticate/${id}`:null;
            const response=await fetch(url,{
                method:"GET"
            })
            const parseRes = await response.json();
            if (parseRes.error) {
                console.log(parseRes.error)
                setIsScanned(false);
            } else {
                const userDetails = {
                    username:parseRes.data.username,
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
    },[screen.width])
  return (
    <>
        {isSupported(
            <BrowserRouter>
            <GlobalContext.Provider value={{ details, API_URL }}>
                <Routes>
                    <Route path="/" element={<ScanPage/>}/>
                    <Route path="/details/:id" element={isScanned?<DetailPage/>:<Navigate to="/"/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </GlobalContext.Provider>
            <Error data={error}/>
            </BrowserRouter>
        ):(
            <NotSupported/>    
        )}
    </>
  )
}

export default App
