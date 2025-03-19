import { useState } from "react";
import useRenterEachLocation from "./useRenterEachLocation";
import useRenter from "./useRenter";

const useRenterEachLocationFetch = () => {
  const [loading,setIsLoading]=useState(false);
  const [error,setError]=useState("");
  const {state,dispatch}=useRenterEachLocation();
  const {state:tempstate}=useRenter();
 const fetchEachLocation=async(locationId:number,num1:number,num2:number)=>{
    console.log(locationId,num1,num2)
    try{
       setIsLoading(true);
       setError("")
        const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protected/rentereachlocationcars/getLocationcars",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${tempstate.token}`,
                 "Content-Type": "application/json"
            },
            body:JSON.stringify({
                locationId:locationId,
                num1:num1,
                num2:num2
            })
        })
        const data=await response.json();
        // console.log(data)
        if(response.ok){
            dispatch({type:"ADD_LOCATION_CARS",payload:{...data,currPage:state.locationCars.currPage+3}})
        }
    }catch{
       setError("server error is not working");
    }
    setIsLoading(false);
 }
 return {error,loading,fetchEachLocation};
}

export default useRenterEachLocationFetch