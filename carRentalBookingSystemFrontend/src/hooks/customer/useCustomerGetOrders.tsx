import { useState } from "react"
import { useCustomer } from "./useCustomer"

const useCustomerGetOrders = () => {
  const [error,setError]=useState("")
  const [loading,setIsLoading]=useState(false)
  const {state}=useCustomer()
  const customerOrders=async(num1:number,num2:number)=>{
    try{
      setError("")
      setIsLoading(true)
      const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protectedcustomer/booking/getallbookings",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "authorization":`Bearer ${state.token}`
        },
        body:JSON.stringify({num1,num2})
      })
      const data=await response.json()
      console.log(data)
      if(response.ok){
        setIsLoading(false)
        return data
      }
      else{
        setIsLoading(false)
        return []
      }
    }
    catch{
      setError("something went wrong with server ")
      setIsLoading(false)
      return []
    }
    
  }
  return {error,loading,customerOrders}
}

export default useCustomerGetOrders