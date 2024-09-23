import { Scanner } from '@yudiel/react-qr-scanner';
import { GlobalContext } from "../context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanPage(){
    const { authenticate, showErrorDialog }=useContext(GlobalContext);
    const [isVideo,SetIsVideo]=useState(true)

    async function startRecording(){
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            // ok, browser supports it
            try{
                const constraints = {
                    video: {
                        width: {
                            min: 1280,
                            ideal: 1920,
                            max: 2560,
                        },
                        height: {
                            min: 720,
                            ideal: 1080,
                            max: 1440,
                        },
                        //facingMode: "environment"
                    },
                }
                const video = document.querySelector('#video')
                const videoStream = await navigator.mediaDevices.getUserMedia(constraints)
                video.srcObject = videoStream
            }catch(error:any){
                console.log(error)
                //showErrorDialog("Error",error.message)
                SetIsVideo(false)
            }
        }
    }

    const navigate=useNavigate()
    function handleScan(result:any){
        result.forEach((i:any)=>{
            if(i.format.includes("qr_code")){
                try{
                    const value=JSON.parse(i.rawValue)
                    console.log(value)
                    if(value.registration_number){
                        authenticate(true,value.registration_number)
                        navigate("/details")
                    }else{
                        let errorMessage=`You are not authorized!`
                        showErrorDialog("Error",errorMessage)
                    }
                }catch(error:any){
                    showErrorDialog("Error",`Invalid qr code!`)
                }
            }else{
                let errorMessage=`${i.format} is not supported`
                console.log(`${i.format} is not supported`,i.rawValue)
                showErrorDialog("Error",errorMessage)
            }
        })
    }

    useEffect(()=>{
        startRecording()
    },[])
    return(
        <>
        {isVideo?(
            <video autoPlay id="video" className="flex flex-col justify-center items-center max-h-screen">
                <Scanner
                    allowMultiple={true}
                    classNames={{container:"my-[23vh]"}} 
                    onScan={(result) => handleScan(result)}
                    scanDelay={1500}
                />
            </video>
        ):(
            <div className="flex flex-col justify-center items-center max-h-screen bg-[var(--primary-01)]">
                <Scanner
                    allowMultiple={true}
                    classNames={{container:"my-[23vh]"}} 
                    onScan={(result) => handleScan(result)}
                    scanDelay={1500}
                />
            </div>
        )}
        </>
    )
}
