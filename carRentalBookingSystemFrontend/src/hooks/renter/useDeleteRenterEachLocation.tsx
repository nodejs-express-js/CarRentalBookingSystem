import { useState } from "react"
import useRenter from "./useRenter";
import useRenterEachLocation from "./useRenterEachLocation";



const useDeleteRenterEachLocation = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false);
  const {state}=useRenter();
  const {dispatch}=useRenterEachLocation();
  const deleteEachLocationPost=async(carId:number,locationId:number)=>{
    try{
       setIsLoading(true);
       setError("")
        const response=await fetch(import.meta.env.VITE_BACKEND_URL+`protected/rentereachlocationcars/deletelocationcars/${carId}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
        })
        if(response.ok){
            dispatch({type:"DELETE_ONE",payload:{
                carid:carId,
                locationId:locationId
            }})
        }
        else{
            const data=await response.json()
            setError(data.message)
        }
    }
    catch{
        setError("something went wrong with server when deleting location")
    }
    setIsLoading(false);
    }
    return {error,loading,deleteEachLocationPost};

}

export default useDeleteRenterEachLocation