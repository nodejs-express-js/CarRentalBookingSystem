import { useState } from "react";
import useRenter from "./useRenter";
import { useNavigate } from "react-router-dom";

const useRenterLogin = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false);
  const {dispatch}=useRenter();
  const navigate=useNavigate();
  const loginRenter=async(email:string,password:string)=>{
    try{
        setIsLoading(true);
        setError("");
        const response=await fetch(import.meta.env.VITE_BACKEND_URL+"renter/login",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const data=await response.json();
        if(response.ok){
            dispatch({
                type:"ADD_RENTER",
                payload:data
            })
            navigate("/renter")
        }
        else{
            setError(data.message);
        }
    }
    catch{
        setError("something went wrong with server");
    }
    setIsLoading(false);

    }
  return {error,loading,loginRenter}
}

export default useRenterLogin