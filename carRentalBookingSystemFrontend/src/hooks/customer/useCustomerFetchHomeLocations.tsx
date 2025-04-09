import { useState } from "react";
import { useCustomer } from "./useCustomer";
interface CarRentalLocation {
    id: number;
    name: string;
    city: string;
    carRentalPhoto: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    distancesquared: number;
    distance: number;
  }
  type ret={
    results:CarRentalLocation[]
  }
const useCustomerFetchHomeLocations = () => {
    const [error,setError]=useState("");
    const [loading,setIsLoading]=useState(false);
    const {state}=useCustomer();
    const RefreshHomeLocations=async(latitude:number,longitude:number)=>{
        setError("")
        setIsLoading(true)
        console.log(latitude,longitude)
        try{    
            const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protectedcustomer/customerhome/fetchlocations",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${state.token}`
                },
                body:JSON.stringify({
                    latitude:latitude,
                    longitude:longitude
                })
            })
           
            if(response.ok){
                const ret:ret=await response.json()
                setIsLoading(false)
                return ret.results;
            }
            else{
                setIsLoading(false)
                return []
            }
        }
        catch
        {
            setError("something went wrong with server ")
        }
        setIsLoading(false)
        return []
    }
    return {error,loading,RefreshHomeLocations}
}

export default useCustomerFetchHomeLocations