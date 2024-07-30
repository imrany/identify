import Offline from "../assets/offline.png";

export default function OfflinePage(){
    return(
        <div className="flex flex-col gap-y-2 h-screen bg-[var(--primary-01)] items-center justify-center text-[var(--primary-02)]">
            <img src={Offline} className="rounded-[30px]" width={150} height={150} alt="Not supported image"/>
            <div className="text-4xl max-md:text-3xl text-center font-semibold">
                <p>Sorry</p>
                <p>You are offline</p>
            </div>
            <div className="text-[var(--primary-03)] text-center text-base max-md:text-sm my-2">
                <p>Please check your internet connection</p>
                <p>Try again</p>
            </div>
            <button onClick={()=>window.location.reload()} className="flex justify-center items-center rounded-[30px] w-[120px] text-[var(--primary-01)] h-[43px] bg-[var(--button-bg-01)]">Refresh</button>
        </div>
    )
}
