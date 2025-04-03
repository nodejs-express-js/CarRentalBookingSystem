import { useState } from "react";
import useRenter from "./useRenter";

const useRenterSignUp = () => {
 const [error,setError]=useState("");
 const [loading,setIsLoading]=useState(false);
 const {dispatch}=useRenter();

    const signRenterUp=async(form:FormData)=>{
        try{
            setError("");
            setIsLoading(true)
            const response=await fetch(import.meta.env.VITE_BACKEND_URL+"renter/signup",{
                method:"POST",
               
                body:form
            })
            const data=await response.json();
            if(response.ok){
                dispatch({type:"ADD_RENTER",payload:data})
            }
            else{
                setError(data.message)
            }
        }
        catch{
        setError("server error is not working");
        }
        setIsLoading(false);

    }
return {error,loading,signRenterUp}
}

export default useRenterSignUp