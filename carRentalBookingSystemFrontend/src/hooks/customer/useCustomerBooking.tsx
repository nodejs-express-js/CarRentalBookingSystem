import { useState } from "react"
import { useCustomer } from "./useCustomer";
import { useNavigate } from "react-router-dom";


export type bookingType={
    date:string,
    carId:number,
    cardType:string,
    cardNumber:string,
    cardCVV:string,
    cardHolderName:string
}



const useCustomerBooking = () => {
    const [error,setError]=useState("");
    const [loading,setIsLoading]=useState(false);
    const {state}=useCustomer();
    const navigate=useNavigate();
    const customerbooking=async(booking:bookingType)=>{
        try{
            setError("")
            setIsLoading(true)
            const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protectedcustomer/booking/createabooking",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${state.token}`
                },
                body:JSON.stringify(booking)
            })
            const data=await response.json();
            if(response.ok){
                navigate('/customersuccess', { state: data  });
            }
            else{
                setError(data.message)
            }
        }
        catch{
            setError("something went wrong with server ")
        }
        setIsLoading(false)
    }
    return {error,loading,customerbooking}
}

export default useCustomerBooking