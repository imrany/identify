import { GlobalContext } from "../context";
import { useContext } from "react";
import Cactus from "../assets/cactus.png"; 
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function DetailPage(){
    const { details }=useContext(GlobalContext);
    const navigate=useNavigate()
    console.log(JSON.stringify(details))
    return(
        <div className="text-[var(--primary-02)] flex flex-col items-center pb-8 bg-[var(--primary-01)] h-screen">
            <div className="w-screen bg-[var(--button-bg-01)] text-[var(--primary-01)] h-[50px] flex items-center justify-center">
                <p>Access granted</p>
            </div>
            <div className="flex justify-center gap-4 mt-6 h-[120px]">
                <img src={Cactus} className="rounded-[20px] object-fit h-[120px] w-[120px]" alt="Student's image"/>
                <div className="flex-grow flex flex-col gap-3 h-full">
                    <div>
                        <p className="text-xl font-semibold max-w-[200px] capitalize">{details.fullName}</p>
                        <p className="text-sm text-[var(--primary-03)] capitalize">{details.course}</p>
                        <p className="text-sm text-[var(--primary-03)]">{details.registrationNumber}</p>
                        <p className="text-sm text-[var(--primary-03)] uppercase">{details.school}</p>
                    </div>
                    <div className="text-base text-[var(--button-bg-01)] items-center flex gap-2">
                        <PiStudentBold className=""/>
                        <p className="capitalize">{details.type}</p>
                    </div>
                </div>
            </div>
            <button className="flex mt-auto justify-center items-center rounded-[30px] w-[90vw] text-[var(--primary-01)] h-[43px] bg-[var(--button-bg-01)]" onClick={()=>navigate(-1)}>Next</button>
        </div>
    )
}
