import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import Pay from "./pages/Pay";
import NotFound from "./pages/NotFound";
import NotSupported from "./components/NotSupported";
import { GlobalContext } from "./context";
import { Error } from "./components/dialogs";
import { openDialog } from "./components/actions"

function App() {
    const API_URL = "https://qr-pay-server.onrender.com";
    //const API_URL = "http://localhost:8080";
    const [isLoading,setIsLoading]=useState(true);
    const [isAuth,setIsAuth]=useState(false);
    const [isSupported,setIsSupported]=useState(true);
    const [user, setUser] = useState<any>({
        username: "",
        phoneNumber: 0,
    });
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

    const user_data:any=localStorage.getItem("user_data");
    const $user_data:any=user_data!==null?JSON.parse(user_data):{};
    async function authenticate() {
        try {
            const url=`${API_URL}/api/users/${$user_data.phoneNumber}`
            const response=await fetch(url,{
                method:"GET",
                headers:{
                    "authorization":`Bearer ${$user_data.accessToken}`
                }
            })
            const parseRes = await response.json();
            if (parseRes.error) {
                console.log(parseRes.error)
                setIsAuth(false);
                setIsLoading(false);
            } else {
                const userData = {
                    username:parseRes.data.username,
                    phoneNumber:parseRes.data.phone_number
                }
                setUser(userData);
                setIsAuth(true);
                setIsLoading(false);
            }
        }catch(error:any){
            setIsAuth(false);
            setIsLoading(false);
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
        if (user_data !== null) {
            authenticate();
        } else {
            setIsAuth(false);
            setIsLoading(false);
        }
    },[screen.width,isAuth])
  return (
    <>
        {isSupported?(
            <BrowserRouter>
            <GlobalContext.Provider value={{ user, API_URL }}>
                {isLoading ? (
                    <div className="fixed top-0 bottom-0 left-0 z-20 right-0 bg-[var(--primary-01)]">
                        <div className="flex flex-col items-center h-[100vh] justify-center">
                            <p className="text-xl text-[var(--primary-02)]">
                                Loading...
                            </p>
                        </div>
                    </div>
                ) : (
                <Routes>
                    <Route path="/landing_page" element={!isAuth?<LandingPage/>:<Navigate to="/"/>}/>
                    <Route path="/sign_in" element={!isAuth?<SignIn/>:<Navigate to="/"/>}/>
                    <Route path="/sign_up" element={!isAuth?<SignUp/>:<Navigate to="/"/>}/>
                    <Route path="/" element={isAuth?<Layout />:<Navigate to="/sign_in"/>}>
                    <Route index element={<Home />} />
                        <Route path="pay" element={<Pay />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                )}
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
