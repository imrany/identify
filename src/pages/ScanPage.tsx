import { GlobalContext } from "../context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanPage(){
    const { authenticate, showErrorDialog }=useContext(GlobalContext);
    const [isVideo,SetIsVideo]=useState(true)
    const [error,setError]=useState("")
    const navigate=useNavigate()
    
    async function startRecording(){
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            // ok, browser supports it
            try{
                const constraints = {
                    video: true,
                    audio: false
                }
                const video = document.querySelector('#video')
                const canvas = document.querySelector('#canvas')
                const videoStream = await navigator.mediaDevices.getUserMedia(constraints)
                video.srcObject = videoStream
                canvas.getContext('2d').drawImage(video, 0, 0, canva.width, canvas.height)
                const image_data_url=canvas.toDataURL('image/jpeg')
                setInterval(()=>{
                    sendPhoto(image_data_url)
                },5000)
            }catch(error:any){
                console.log(error)
                //showErrorDialog("Error",error.message)
                setError(error.message)
                SetIsVideo(false)
            }
        }
    }

    async function sendPhoto(image_data_url:any){
        try{
            const url=`/submit`
            //Remove 'data:image/png;base64,' from the data url
            const base64Data=image_data_url.split(',')[1]
            const response=await fetch(url,{
                method:"POST",
                body:JSON.stringify({image:base64Data}),
                headers:{
                    "content-type":"application/json"
                }
            })
            const parseRes=await response.json()
            if(parseRes.error){
                console.error(parseRes.error)
            }else{
                console.log(parseRes)
            }
        }catch(error:any){
            let errorMessage=`${error.message}.`
            showErrorDialog("Error",errorMessage)
            console.log(errorMessage)
        }
    }

    useEffect(()=>{
        startRecording()
    },[])
    return(
        <>
        {isVideo?(
            <div className="flex flex-col justify-center items-center h-screen bg-[#252525]">
                <canvas height={740} id="canvas" style={{display:"none"}}></canvas>
                <video height={740} autoPlay id="video">/video>
            </div>
        ):(
            <div className="flex flex-col justify-center items-center h-screen bg-[var(--primary-01)]">
                <p className="text-sm text-center">{error}</p>    
            </div>
        )}
        </>
    )
}
