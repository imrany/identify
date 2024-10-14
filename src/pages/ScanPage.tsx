import { GlobalContext } from "../context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanPage(){
    const { sendPhoto, showErrorDialog }=useContext(GlobalContext);
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
                canvas.getContext('2d').drawImage(video, 0, 0, 224, 224)
                setInterval(()=>{
                    canvas.toBlob((blob:any)=>{
                        sendPhoto(blob)
                    },'image/png')
                },5000)
            }catch(error:any){
                console.log(error)
                //showErrorDialog("Error",error.message)
                setError(error.message)
                SetIsVideo(false)
            }
        }
    }

    
    useEffect(()=>{
        startRecording()
    },[])
    return(
        <>
        {isVideo?(
            <div className="flex flex-col justify-center items-center h-screen bg-[#252525]">
                <video height={240} autoPlay id="video"></video>
                <canvas height={240} id="canvas" style={{display:"none"}}></canvas>
            </div>
        ):(
            <div className="flex flex-col justify-center items-center h-screen bg-[var(--primary-01)]">
                <p className="text-sm text-center">{error}</p>    
            </div>
        )}
        </>
    )
}
