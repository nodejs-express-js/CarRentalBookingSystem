import { useState } from "react"
import useRenter from "./useRenter";
import useRenterLocation from "./useRenterLocation";

const useRenterLocationFetch = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false);
  const {state:renter}=useRenter();
  const {dispatch}=useRenterLocation();

  const fetchFewLocations=async (num1:number,num2:number)=>{
          
    try{
        setError("")
        setIsLoading(true)
      if(renter.token){
        const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protected/renterhome/getalllocations",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${renter.token}`,
                 "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "num1":num1,
                "num2":num2
            })
        })
        const data=await response.json();
        console.log(data)
        if(response.ok){
          console.log("============="+data.length)
            if(data.length > 0){
            dispatch({type:'ADD_LOCATIONS',payload:data})
            }
            else{
               setIsLoading(false) 
               setError("no more locations found")
            }
        }
        else{
            setError(data.message)
        }
      }
      else{
        setError("You are not logged in")
        dispatch({type:'INITIALIZE_LOCATIONS',payload:[]})
      }
    }
    catch{
        setError("something went wrong with the server")
        dispatch({type:'INITIALIZE_LOCATIONS',payload:[]})
    }
    setIsLoading(false)
}
return {error,loading,fetchFewLocations}
}

export default useRenterLocationFetch