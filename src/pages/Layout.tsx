import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
            <div className="text-[var(--primary-02)] bg-[var(--primary-01)] h-screen">
                <Outlet/>
            </div>
        </>
    )
}
