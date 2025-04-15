

import  { useState } from 'react'
import { useCustomer } from './useCustomer'

const useCustomerDisableDates = () => {
  const [error,setError]=useState("")
  const [loading,setIsLoading]=useState(false)
  const {state}=useCustomer()
  const getdisabledates=async(carId:number)=>{
    try{
        setError("")
        setIsLoading(true)
        const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protectedcustomer/booking/datestodisable",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${state.token}`
            },
            body:JSON.stringify({
                carId:carId
            })
        }
        )
        const data=await response.json()
        if(response.ok){
          setIsLoading(false)
          return data.ret
        }
        else{
            setIsLoading(false)
            setError(data.message)
            return []
        }
    
    }
    catch{
        setIsLoading(false)
        setError("something went wrong with server")
        return []
    }
  }
  return {error,loading,getdisabledates}
}

export default useCustomerDisableDates