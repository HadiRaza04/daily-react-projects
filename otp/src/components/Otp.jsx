import { useEffect, useRef, useState } from "react"

const Otp = ({otpLength= 6}) => {
    const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
    const ref = useRef([]);

    const handleKeydown = (e, i) => {
        const copyOtpFields = [...otpFields];
        const key = e.key;

        if(key === "ArrowRight") {
            ref.current[i+1].focus();
        }
        if(key === "ArrowLeft") {
            ref.current[i-1].focus();
        }
        
        if(key === "Backspace") {
            copyOtpFields[i] = "";
            setOtpFields(copyOtpFields);
            ref.current[i-1].focus();
        }
        if(isNaN(key)) {
            return;
        }
        
        copyOtpFields[i] = key;
        setOtpFields(copyOtpFields);
        ref.current[i+1].focus();

    }
    useEffect(() => {
        ref.current[0].focus();

    }, [])
    
  return (
    <div>
        {
            otpFields.map((v, i) => {
                return (
                    <input 
                        className="border-2 m-3 p-2 border-black w-[2rem] h-[2rem]"
                        type="text" 
                        key={i}
                        onKeyDown={(e) => handleKeydown(e, i)}
                        value={v}
                        ref={(currentInput) => ref.current[i] = currentInput}
                    />
                )
            })
        }
    </div>
  )
}

export default Otp