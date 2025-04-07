import { useEffect, useRef } from "react";
import useRenterLocation from "../../hooks/renter/useRenterLocation"
import Navbar from "./Navbar"
import useRenterLocationFetch from "../../hooks/renter/useRenterLocationFetch";
import Styles from './RenterHome.module.css'
import RenterHomeRight from "./RenterHomeRight";
import deleteIcon from "../../assets/icons8-delete.svg";
import useDeleteRenterLocation from "../../hooks/renter/useDeleteRenterLocation";
import { useNavigate } from "react-router-dom";
import useRenterEachLocation from "../../hooks/renter/useRenterEachLocation";
const RenterHome = () => {
  const {state,dispatch:renterDispatch}=useRenterLocation();
  const {error,loading,fetchFewLocations}=useRenterLocationFetch();
  const {error:deleteerror,loading:deleteloading,deleteloc}=useDeleteRenterLocation();
  const currLast=useRef<null>(null);
  const initialFetchDone = useRef(false);
  const navigate=useNavigate();
 const {dispatch}=useRenterEachLocation();

  useEffect(()=>{
     const initialObserver=new IntersectionObserver(async(entries)=>{
      if(entries[0].isIntersecting){
           await fetchFewLocations(state.currPage,state.currPage+2);
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
    if (!initialFetchDone.current && state.locations.length===0) {
      fetchFewLocations(0, 2);
      renterDispatch({type:"SET_CURR_PAGE",payload:3})
      initialFetchDone.current = true;
    }
  },[])
  const deleteLocation=async(id:number)=>{
    if(deleteloading){
      return;
    }
    deleteloc(id);
  }
  
  const gotoRenterLocation=(id:number)=>{
    dispatch({type:"SET_CURRENT_LOCATION",payload:""+id})
    navigate(`/eachlocation/${id}`)
  }

  const showLocations = () => {
    return state.locations.map((location, index) => (
      <div 
        key={index} 
        ref={index === state.locations.length - 1 ? currLast : null} 
        className={Styles.locationCard}
        
      >
        <div onClick={()=>{gotoRenterLocation(location.id)}} className={Styles.locCard}>
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