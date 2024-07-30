import { IoChevronForwardOutline } from "react-icons/io5";
import InLogo from "../components/InLogo";
import { useContext, useState } from "react";
import { GlobalContext } from "../context";
import { Error } from "../components/dialogs";
import { openDialog } from "../components/actions";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUp(){
    const { API_URL } = useContext(GlobalContext);
    const [disabled,setDisabled]=useState(false);
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

    async function handleSubmit(e:any){
        try{
            e.preventDefault()
            setDisabled(true)
            if(e.target.password.value!==e.target.confirm_password.value){
                setDisabled(false)
                showErrorDialog("Error","Password doesn't match!")
            }else{
                if(e.target.phone_number.value.slice(0,3).includes("254")===false&&e.target.phone_number.value.slice(0,2).includes("07")===false){
                    setDisabled(false)
                    showErrorDialog("Error","Wrong phone number format")
                }else{
                    const $navigator:any=navigator;
                    const date=new Date
                    const Today=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
                    let phone_number:string
                    if(e.target.phone_number.value.slice(0,2)==="07"){
                        phone_number=`${e.target.phone_number.value.slice(0,2).replace('07','2547')}${e.target.phone_number.value.slice(2,e.target.phone_number.length)}`
                    }else{
                        phone_number=e.target.phone_number.value
                    }

                    const response=await fetch(`${API_URL}/api/auth/sign_up`,{
                        method:"POST",
                        body:JSON.stringify({
                            username:e.target.username.value,
                            phone_number:phone_number.length!==12?null:phone_number,
                            password:e.target.confirm_password.value,
                            userPlatform:$navigator.userAgentData.platform,
                            lastLogin:Today
                        }),
                        headers:{
                            "content-type":"application/json"
                        }
                    })
                    const parseRes=await response.json()
                    if(parseRes.error){
                        setDisabled(false)
                        console.log(parseRes.error)
                        showErrorDialog("Error",parseRes.error)
                    }else{
                        console.log(parseRes)
                        const userData = {
                            username:parseRes.data.username,
                            phoneNumber:parseRes.data.phone_number,
                            accessToken:parseRes.data.access_token
                        }
                        localStorage.setItem("user_data", JSON.stringify(userData));
                        setDisabled(false)
                        window.location.reload()
                    }
                 }          
            } 
        }catch(error:any){
            setDisabled(false)
            let errorMessage=error.message.includes("Failed to fetch")?"No connection":error.message
            showErrorDialog("Error",errorMessage)
            console.log(error.message)
        }
    }
    return(
        <motion.div 
            initial={{x:300}}
            animate={{x:0}}
            transition={{ duration: 0.2 }}
            className="h-screen text-[var(--primary-02)] bg-[var(--primary-01)] flex flex-col justify-center items-center"
        >
            <InLogo/>
            <div className="text-[var(--primary-03)] text-center text-base my-2">
                <p>Fast Payment. Scan to pay</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col mt-10 max-md:w-[90vw] gap-5">
                <div className="flex flex-col gap-3">
                    <label htmlFor="username" className="text-base font-semibold">Enter full name</label>
                    <input id="username" name="username" type="text" placeholder="John Doe" className="px-4 py-2 text-[var(--primary-02)] border-[1px] rounded-[30px] focus:outline-none" required/>
                </div>
        
                <div className="flex flex-col gap-3">
                    <label htmlFor="phone_number" className="text-base font-semibold">Enter phone number</label>
                    <input id="phone_number" name="phone_number" type="tel" placeholder="2547..." className="px-4 py-2 text-[var(--primary-02)] border-[1px] rounded-[30px] focus:outline-none" required/>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-base font-semibold">Enter password</label>
                    <input id="password" minLength={8} maxLength={24} name="password" type="password" className="px-4 py-2 text-[var(--primary-02)] border-[1px] rounded-[30px] focus:outline-none" required/>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="confirm_password" className="text-base font-semibold">Confirm password</label>
                    <input id="confirm_password" minLength={8} maxLength={24} name="confirm_password" type="password" className="px-4 py-2 text-[var(--primary-02)] border-[1px] rounded-[30px] focus:outline-none" required/>
                </div>

                <button disabled={disabled} className={disabled===false?"flex justify-center px-3 items-center rounded-[30px] w-full text-[var(--primary-01)] h-[43px] bg-[var(--button-bg-01)]":"flex justify-center px-3 items-center rounded-[30px] w-full text-gray-300 h-[43px] bg-[var(--primary-03)]"}>
                    <p className="flex-grow">Create account</p>
                    <IoChevronForwardOutline  className="ml-auto"/>
                </button>

            </form>
            <div className="text-sm flex mt-4 font-semibold items-center gap-2">
                <p className="text-[var(--primary-03)]">Already have an account?</p>
                <Link to="/sign_in" className="text-[var(--button-bg-01)]">Sign in</Link>
            </div>
            <Error data={error}/>
        </motion.div>
    )
}
