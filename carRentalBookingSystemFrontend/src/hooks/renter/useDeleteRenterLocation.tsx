import { useState } from "react";
import useRenter from "./useRenter";
import useRenterLocation from "./useRenterLocation";

const useDeleteRenterLocation = () => {
    const [error,setError]=useState("");
    const [loading,setIsLoading]=useState(false)
    const {state}=useRenter();
    const {dispatch}=useRenterLocation();

    const deleteloc=async(id:number)=>{
        try{
            setIsLoading(true)
            setError("")
            const response=await fetch(import.meta.env.VITE_BACKEND_URL+`protected/renterhome/delete/${id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
              },
            });
            const data=await response.json();
            if(response.ok){
                    dispatch({payload:id,type:"DELETE_LOCATION"})
            }
            else{
                setError(data.message);
            }
          }catch{
            setError("facing issues with server");
          }
          setIsLoading(false)
    }
    return {error,loading,deleteloc}
}

export default useDeleteRenterLocation