import { useState } from "react";
import useRenter from "./useRenter";
import useRenterEachLocation from "./useRenterEachLocation";
type carDetailsType={
    make: string,
    model: string,
    year: number,
    pricePerDay: number,
    photo: File|null,
    locationId: number,
  };

const useCreateRenterEachLocation = () => {
  const [error,setError]=useState("");
  const [loading,setIsLoading]=useState(false);
  const {state}=useRenter();
  
  const {dispatch}=useRenterEachLocation();

  const createRenterEachLocationPost=async(post:carDetailsType,num1:number)=>{
    console.log(post)
    try{
        setError("")
        setIsLoading(true)

        const temp=new FormData();
        temp.append("make",post.make);
        temp.append("model",post.model);
        temp.append("year",post.year.toString());
        temp.append("pricePerDay",post.pricePerDay.toString());
        temp.append("locationId",post.locationId.toString());

        if (post.photo) {
            temp.append("photo", post.photo);
        } 
        const response=await fetch(import.meta.env.VITE_BACKEND_URL+"protected/rentereachlocationcars/createlocationcars",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${state.token}`,
            },
            body:temp
 
        })
        const data=await response.json();
        if(response.ok){
            
            dispatch({type:"ADD_LOCATION_CARS",payload:{cars:[data],currPage:num1,locationId:post.locationId}})
            
        }
        if(response.ok){
            console.log(data);
        }
    }
    catch(error){
        console.log(error)
        setError('something went wrong');
    }
    setIsLoading(false);

  }
  return {error,loading,createRenterEachLocationPost}
}

export default useCreateRenterEachLocation