import Navbar from "../components/Navbar";
import { GlobalContext } from "../context";
import { useContext } from "react";
import QrCodeBg from "../assets/scan_qrcode.jpg";
import { CiBarcode } from "react-icons/ci";
import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate=useNavigate();
    const { user } =useContext(GlobalContext);
    return(
        <div className="bg-[var(--primary-01)] flex flex-col text-[var(--primary-02)] h-screen">
            <Navbar/>
            <div className="mt-[60px] flex flex-col px-2 py-6">
                <div className="flex flex-col gap-2 p-6 h-[200px] text-white rounded-[20px]" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${QrCodeBg}') center no-repeat`, backgroundSize:"cover"}}>
                    <p className="text-2xl font-semibold">Welcome, {user.username}</p>
                    <div>
                        <p>Make fast payment by scanning.</p>
                        <p>It's a convinent way for daily transactions.</p>
                    </div>

                    <button onClick={()=>navigate("/pay")} className="flex justify-center px-3 items-center rounded-[30px] w-[150px] text-[var(--primary-01)] h-[43px] bg-[var(--button-bg-01)] gap-2">
                        <CiBarcode className="text-3xl"/>
                        <p>Scan to pay</p>
                    </button>
                </div>

            </div>
        </div>
    )
}
