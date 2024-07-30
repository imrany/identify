import { Scanner } from '@yudiel/react-qr-scanner';

export default function Pay(){
    function handleScan(result:any){
        result.forEach((i:any)=>{
            if(i.format.includes("qr_code")){
                console.log(i.rawValue)
            }else{
                console.log(`${i.format} is not supported`,i.rawValue)
            }
        })
    }
    return(
        <div className="text-white">
            <Scanner
                //allowMultiple={true}
                classNames={{container:"my-[25vh]"}} 
                onScan={(result) => handleScan(result)} 
            />
        </div>
    )
}
