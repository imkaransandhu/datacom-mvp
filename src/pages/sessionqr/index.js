import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function SessionQr() {

    const [qrSrc, setQrSrc] = useState('')

    useEffect(() => {
        QRCode.toDataURL("https://www.meccabeauty.co.nz").then((data) =>{
            setQrSrc(data)
            const newGUID = uuidv4()
            console.log(newGUID)
            const previousValue = localStorage.getItem('dataKey')
            localStorage.setItem('previousDataKey', previousValue)// should this be an if, just incase there isn't one already. 
            localStorage.setItem('dataKey', newGUID)
        })
    }, [])

    

  return (
    <div>
        <img src={qrSrc} />
    </div>
  )
}
