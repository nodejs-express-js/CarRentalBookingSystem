import { useEffect, useRef, useState } from "react";
import useRenterLocation from "../hooks/useRenterLocation"
import Navbar from "./Navbar"
import useRenterLocationFetch from "../hooks/useRenterLocationFetch";

const RenterHome = () => {
  const {state}=useRenterLocation();
  const [currPage,setPageCurr]=useState(0);
  const {error,loading,fetchFewLocations}=useRenterLocationFetch();
  const currLast=useRef<null>(null);
  useEffect(()=>{
     const initialObserver=new IntersectionObserver(async(entries)=>{
      if(entries[0].isIntersecting){
           await fetchFewLocations(currPage,currPage+2);
           setPageCurr(currPage+2)
      }
     },{ threshold: 1})
     if(currLast.current){
      initialObserver.observe(currLast.current)
     }
     return () => {
      if (currLast.current) {
        initialObserver.unobserve(currLast.current);
      }
  };
  },[state])
  useEffect(()=>{
    fetchFewLocations(0,0+2);
    setPageCurr(0+2)
  },[])
  const showLocations=()=>{
    return state.map((location,index)=>{
      if(index===state.length-1){
      return (<div key={index} ref={currLast}>
        <div>{location.name}</div>
        <img src={location.carRentalPhoto} alt={location.name}></img>
        <div>{location.city}</div>
        <div>{location.state}</div>
        <div>{location.country}</div>
        <div>{location.latitude}</div>
        <div>{location.longitude}</div>
      </div>)
      }
      else{
      return (<div key={index}>
        <div>{location.name}</div>
        <img src={location.carRentalPhoto} alt={location.name}></img>
        <div>{location.city}</div>
        <div>{location.state}</div>
        <div>{location.country}</div>
        <div>{location.latitude}</div>
        <div>{location.longitude}</div>
      </div>)
     
      }
  })
}
  return (
    <>
        <Navbar></Navbar>
        <div>
          {showLocations()}
          {loading ? <div>Loading...</div> : <></>}
          {error ? <div>{error}</div> : <></>}
        </div>  
    </>
  )
}

export default RenterHome