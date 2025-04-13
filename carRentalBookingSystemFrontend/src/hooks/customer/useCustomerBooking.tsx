import { useState } from "react"
import { useCustomer } from "./useCustomer";
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
    const customerbooking=async(booking:bookingType)=>{
        try{
            setError("")
            setIsLoading(true)
            console.log(booking)
            const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protectedcustomer/booking/createabooking",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${state.token}`
                },
                body:JSON.stringify(booking)
            })
            if(response.ok){
                console.log(await response.json())
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