import { useState } from "react"
import { useCustomer } from "./useCustomer";
export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: string;
  photo: string;
  locationId: number;
  createdAt: string;
  updatedAt: string;
}
type retType={
  cars:Car[]
}
const useCustomerFetchEachLocationCars = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false)
  const {state}=useCustomer();
  const fetchfewcars=async(num1:number,num2:number,locationId:number)=>{
    setError("")
    setIsLoading(true)
    try{
      const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protectedcustomer/customerhome/fetchcars",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${state.token}`
        },
        body:JSON.stringify({
            num1:num1,
            num2:num2,
            locationId:locationId
        })
    })
    if(response.ok){
      const ret:retType=await response.json()
      setIsLoading(false)
      return ret.cars;
    }
    else{
      setIsLoading(false)
      return []
    }
    }
    catch{
      setError("something went wrong server ")
    }
    setIsLoading(false)
    return []
  }
  return {error,loading,fetchfewcars}
}

export default useCustomerFetchEachLocationCars