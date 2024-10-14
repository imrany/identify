import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ScanPage from "./pages/ScanPage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import NotSupported from "./components/NotSupported";
import OfflinePage from "./components/OfflinePage";
import { GlobalContext } from "./context";
import { Error } from "./components/dialogs";
import { openDialog } from "./components/actions"

function App() {
    //const API_URL = "https://qr-pay-server.onrender.com";
    const API_URL = "http://127.0.0.1:5000";
    const [isSupported,setIsSupported]=useState(true);
    const [isOnline,setIsOnline]=useState(navigator.onLine);
    const [details,setDetails]=useState({
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

    
    window.onresize=function(){
        screen.width>1080?setIsSupported(false):setIsSupported(true)
    }

    async function sendPhoto(blob:any){
        try{
            const url=`${API_URL}/submit`
            const formData = new FormData();
            formData.append('file', blob, 'upload_image.png');

            const response=await fetch(url,{
                method:"POST",
                body:formData
            })
            const parseRes=await response.json()
            if(parseRes.error){
                console.error(parseRes.error)
            }else{
                console.log(parseRes)
                setDetails(parseRes.data)
                setIsScanned(true)
            }
        }catch(error:any){
            let errorMessage=`${error.message}.`
            showErrorDialog("Error",errorMessage)
            console.log(errorMessage)
        }
    }

    useEffect(()=>{
        screen.width>1080?setIsSupported(false):setIsSupported(true)
        connectionStatus()
    },[screen.width,isOnline])
  return (
    <>
        {isSupported?(
            <>
                {isOnline?(
                    <BrowserRouter>
                        <GlobalContext.Provider value={{ details, API_URL, sendPhoto, showErrorDialog }}>
                            <Routes>
                                <Route path="/" element={<ScanPage/>}/>
                                <Route path="/details" element={isScanned?<DetailPage/>:<Navigate to="/"/>}/>
                                <Route path="/admin" element={<Admin/>}/>
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
