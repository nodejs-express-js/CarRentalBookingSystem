import { useState } from "react"
import useRenter from "./useRenter";
import useRenterLocation from "./useRenterLocation";

const useRenterLocationFetch = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false);
  const {state:renter}=useRenter();
  const {state,dispatch}=useRenterLocation();

  const fetchFewLocations=async (num1:number,num2:number)=>{
          if(state.currPage===-1){
            return;
          }
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
        if(response.ok){
            if(data.length > 0){
            dispatch({type:'ADD_LOCATIONS',payload:data})
            dispatch({type:"SET_CURR_PAGE",payload:state.currPage+3})

            }
            else{
               setIsLoading(false) 
               setError("no more locations found")
               dispatch({type:"SET_CURR_PAGE",payload:-1})
            }
        }
        else{
            setError(data.message)
        }
      }
      else{
        setError("You are not logged in")
        dispatch({type:'INITIALIZE_LOCATIONS',payload:{locations:[],currPage:0}})
      }
    }
    catch{
        setError("something went wrong with the server")
        dispatch({type:'INITIALIZE_LOCATIONS',payload:{locations:[],currPage:0}})
    }
    setIsLoading(false)
}
return {error,loading,fetchFewLocations}
}

export default useRenterLocationFetch