import QRCode from "../assets/qr-code.png";

export default function InLogo(){
    return(
        <div className="flex gap-2 text-4xl items-center text-center font-semibold">
            <div className="p-[2px] border-[var(--button-bg-01)] border-dashed border-[1px]">
                <img src={QRCode} alt="QR code" width={40} height={10}/>
            </div>
            <p>Identify</p>
        </div>
    )
}
