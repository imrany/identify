import Not_found from "../assets/404_status.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate=useNavigate()
    return (
        <div className="flex flex-col gap-y-2 h-screen bg-[var(--primary-01)] items-center justify-center text-[var(--primary-02)]">
            <img src={Not_found} className="rounded-[30px]" width={180} height={160} alt="Not supported image"/>
            <div className="text-4xl max-md:text-3xl text-center font-semibold">
                <p>Oops</p>
                <p>Page not found</p>
            </div>
            <div className="text-[var(--primary-03)] text-center text-base max-md:text-sm my-2">
                <p>Sorry, the page you're try to reach doesn't exist</p>
                <p>Please go back</p>
            </div>
            <button className="flex justify-center items-center rounded-[30px] w-[120px] text-[var(--primary-01)] h-[43px] bg-[var(--button-bg-01)]" onClick={()=>navigate(-1)}>Go back</button>
        </div>
    );
};
