import { GlobalContext } from "../context";
import { useContext } from "react";

export default function DetailPage(){
    const { details }=useContext(GlobalContext);
    console.log(details)
    return(
        <div className="text-[var(--primary-02)] bg-[var(--primary-01)] h-screen">
            <p>Detail page</p>
        </div>
    )
}
