import { toggleDialog } from "../actions";
import { MdClose } from "react-icons/md";
import { FaTriangleExclamation } from "react-icons/fa6";

type Props={
    data:{
        type:string,
        message:string
    }
}
export function Error(props:Props){
    return(
        <div id={`error_dialog`} className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[#151515]/40 none">
            <div className="flex flex-col justify-center items-center h-[20vh]">
                <div id="dialog" className="flex items-center justify-center w-[90vw] h-[60px] items-center flex bg-[var(--primary-01)] text-[var(--primary-02)] justify-center pr-[24px] pl-[14px] rounded-[20px]">
                    <div className="flex items-center flex-grow gap-3">
                        <FaTriangleExclamation  className="text-red-500 text-3xl"/>
                        <div className=""> 
                            <p className="text-lg font-semibold">{props.data.type}</p>
                            <p className="max-sm:text-sm">{props.data.message.length>30?`${props.data.message.slice(0,30)}...`:props.data.message}</p>
                        </div>
                    </div>

                    <div className="flex ml-auto justify-end h-full items-center justify-center">
                        <MdClose onClick={()=>toggleDialog(`error_dialog`)} className="text-xl font-semibold cursor-pointer"/>
                    </div>  
                </div>
            </div>
        </div>
    )
}

type DialogProps={
    data:{
        name:string
   }
}
export function Dialog(props:DialogProps){
    return(
        <div id={`_dialog`} className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[#151515]/70 none">
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <div id="dialog" className="items-center flex flex-col bg-[var(--primary-01)] text-[var(--primary-02)] justify-center px-[24px] pt-[24px] pb-[54px] rounded-[30px]">
                    <div className="flex ml-auto mb-[8px] justify-end h-[22px] pb-[4px]">
                        <MdClose onClick={()=>toggleDialog(`_dialog`)} className="text-3xl cursor-pointer"/>
                    </div>    
                    <div className="md:w-[452px] text-base w-[80vw] h-[132px]">
                        {props.data.name}
                    </div>
                </div>
            </div>
        </div>
    )
}
