import { useEffect, useRef, useState } from "react";
import useRenterLocation from "../hooks/useRenterLocation"
import Navbar from "./Navbar"
import useRenterLocationFetch from "../hooks/useRenterLocationFetch";
import Styles from './RenterHome.module.css'
import RenterHomeRight from "./RenterHomeRight";
import deleteIcon from "../assets/icons8-delete.svg";
import useDeleteRenterLocation from "../hooks/useDeleteRenterLocation";
const RenterHome = () => {
  const {state}=useRenterLocation();
  const [currPage,setPageCurr]=useState(0);
  const {error,loading,fetchFewLocations}=useRenterLocationFetch();
  const {error:deleteerror,loading:deleteloading,deleteloc}=useDeleteRenterLocation();
  const currLast=useRef<null>(null);
  const initialFetchDone = useRef(false);

  useEffect(()=>{
     const initialObserver=new IntersectionObserver(async(entries)=>{
      if(entries[0].isIntersecting){
        console.log(currPage,currPage+2)
           await fetchFewLocations(currPage,currPage+2);
           setPageCurr(currPage+3)
      }
     },{ threshold: 1})
     const currentLastElement = currLast.current; // Capture the current value

     if(currentLastElement){
      initialObserver.observe(currentLastElement)
     }
     return () => {
      if (currentLastElement) {
        initialObserver.unobserve(currentLastElement);
    }
  };
  },[state])
  useEffect(()=>{
    if (!initialFetchDone.current) {
      console.log("=================1");
      fetchFewLocations(0, 2);
      setPageCurr(3)
      initialFetchDone.current = true;
  }
  },[])
  const deleteLocation=async(id:number)=>{
    if(deleteloading){
      return;
    }
    deleteloc(id);
  }
  const showLocations = () => {
    return state.map((location, index) => (
      <div 
        key={index} 
        ref={index === state.length - 1 ? currLast : null} 
        className={Styles.locationCard}
      >
        <h2 className={Styles.locationName}>{location.name}</h2>
        <img className={Styles.locationImage} src={location.carRentalPhoto} alt={location.name} />
        <div className={Styles.locationDetails}>
          <div>
            <div><strong>City:</strong> {location.city}</div>
            <div><strong>State:</strong> {location.state}</div>
            <div><strong>Country:</strong> {location.country}</div>
           
          </div>
        </div>
        <img src={deleteIcon} alt="delete icon" className={Styles.deleteicon} onClick={()=>{deleteLocation(location.id)}} ></img>
      </div>
    ));
  };
  return (
    <>
    <Navbar />
    <div className={Styles.container}>
      <div className={Styles.minicontainer1}>
        <div>{deleteerror}</div>
          {showLocations()}
          {loading && <div className={Styles.loading}>Loading...</div>}
          {error && <div className={Styles.error}>{error}</div>}
      </div>
     
      <RenterHomeRight />
    </div>  
  </>
  )
}

export default RenterHome