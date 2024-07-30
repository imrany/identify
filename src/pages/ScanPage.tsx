import { Scanner } from '@yudiel/react-qr-scanner';
import { GlobalContext } from "../context";
import { useContext } from "react";

export default function ScanPage(){
    const { authenticate, showErrorDialog }=useContext(GlobalContext);
    function handleScan(result:any){
        result.forEach((i:any)=>{
            if(i.format.includes("qr_code")){
                console.log(i.rawValue)
                if(i.rawValue.id){
                    authenticate(true,i.rawValue.id)
                }else{
                    let errorMessage=`You are not authorized!`
                    showErrorDialog("Error",errorMessage)
                }
            }else{
                let errorMessage=`${i.format} is not supported`
                console.log(`${i.format} is not supported`,i.rawValue)
                showErrorDialog("Error",errorMessage)
            }
        })
    }
    return(
        <div className="flex flex-col justify-center items-center max-h-screen bg-[var(--primary-01)]">
            <Scanner
                //allowMultiple={true}
                classNames={{container:"my-[23vh]"}} 
                onScan={(result) => handleScan(result)} 
            />
        </div>
    )
}
