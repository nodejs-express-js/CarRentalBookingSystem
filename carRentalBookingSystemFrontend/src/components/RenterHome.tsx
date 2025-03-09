import { useEffect, useRef, useState } from "react";
import useRenterLocation from "../hooks/useRenterLocation"
import Navbar from "./Navbar"
import useRenterLocationFetch from "../hooks/useRenterLocationFetch";
import Styles from './RenterHome.module.css'
import RenterHomeRight from "./RenterHomeRight";
const RenterHome = () => {
  const {state}=useRenterLocation();
  const [currPage,setPageCurr]=useState(0);
  const {error,loading,fetchFewLocations}=useRenterLocationFetch();
  const currLast=useRef<null>(null);
  useEffect(()=>{
     const initialObserver=new IntersectionObserver(async(entries)=>{
      if(entries[0].isIntersecting){
           await fetchFewLocations(currPage,currPage+2);
           setPageCurr(currPage+3)
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
    fetchFewLocations(0,2);
    setPageCurr(3)
  },[])
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
      </div>
    ));
  };
  return (
    <>
    <Navbar />
    <div className={Styles.container}>
      <div className={Styles.minicontainer1}>
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