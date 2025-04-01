import { useState } from "react"
import {CarRentalPost} from '../components/Renter/RenterHomeRight';
import useRenter from "./useRenter";

const useCreateRenterLocation = () => {
    const [error,setError]=useState("");
    const [loading,setIsLoading]=useState(false);
    const {state}=useRenter();
    const createRenterLocationPost=async(post:CarRentalPost)=>{
        try{
            setError("");
            setIsLoading(true)
            const form=new FormData();
            form.append("name",post.name);
            form.append("city",post.city);
            form.append("state",post.state)
            form.append("country",post.country)
            form.append("latitude",post.latitude.toString())
            form.append("longitude",post.longitude.toString())
            if (post.carRentalPhoto instanceof File) {
                form.append("carRentalPhoto",post.carRentalPhoto)
            } 
            else {
                setError("Invalid profile picture. It should be a File object.");
                return;
            }
            const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protected/renterhome/createlocation",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${state.token}`,
                },
                body:form
            })  
            const data=await response.json();
            if(response.ok){
               setError("post created successfully")
            }
            else{
                setError(data.message)
            }
        }
        catch{
        setError("server is not working");
        }
        setIsLoading(false)
    }
  return {error,loading,createRenterLocationPost}
}

export default useCreateRenterLocation