import Barrier from "../assets/barrier.png";

export default function NotSupported(){
    return(
        <div className="flex flex-col gap-y-2 h-screen bg-[var(--primary-01)] items-center justify-center text-[var(--primary-02)]">
            <img src={Barrier} className="rounded-[30px]" width={150} height={150} alt="Not supported image"/>
            <div className="text-4xl max-md:text-3xl text-center font-semibold">
                <p>Sorry</p>
                <p>Under maintenance</p>
            </div>
            <div className="text-[var(--primary-03)] text-center text-base max-md:text-sm my-2">
                <p>Sorry, this website can only be used on mobile devices</p>
                <p>Please open on your phone</p>
            </div>
            <a href="mailto:imranmat254@gmail.com" target="_blank" rel="noreferrer noopener" className="flex justify-center items-center rounded-[30px] w-[120px] text-[var(--primary-01)] h-[43px] bg-[var(--button-bg-01)]">Get help</a>
        </div>
    )
}
