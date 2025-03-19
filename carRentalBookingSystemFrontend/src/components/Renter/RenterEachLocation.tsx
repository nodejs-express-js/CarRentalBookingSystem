import { useEffect, useRef } from "react"
import Navbar from "./Navbar"
import useRenterEachLocationFetch from "../../hooks/useRenterEachLocationFetch"
import { useParams } from "react-router-dom";
import useRenterEachLocation from "../../hooks/useRenterEachLocation";

const RenterEachLocation = () => {
    const {error,loading,fetchEachLocation}=useRenterEachLocationFetch();
    const {locationId}=useParams();
    const carref=useRef<null>(null);
    const {state}=useRenterEachLocation();
    useEffect(()=>{
        if (state.locationCars.cars.length==0) {
        if(locationId)
            fetchEachLocation(parseInt(locationId),0,2)     
        }
    },[])
    useEffect(()=>{
        const initialObserver=new IntersectionObserver(async(entries)=>{
            console.log(entries)
            if(entries[0].isIntersecting){
                if(locationId)
                await fetchEachLocation(parseInt(locationId),state.locationCars.currPage,state.locationCars.currPage+2)
            }
        },{
            threshold: 0.5
        }) 
        const currentLastElement=carref.current
        if(currentLastElement){
            initialObserver.observe(currentLastElement)
        }
        return ()=>{
            if(currentLastElement){
                initialObserver.unobserve(currentLastElement)
            }
        } 
    },[state.locationCars.cars])
    
    const showForThisLocation=()=>{
    
        return state.locationCars.cars.map((car,index)=>{
            return <div key={index} 
                ref={index===state.locationCars.cars.length-1 ? carref : null}
            >
                <div>Car brand: {car.make}</div>
                <div>Car Name: {car.model}</div>
                <div>Car Photo: <img src={car.photo} alt={car.model} /></div>
                <div>Car Description: {car.year}</div>
                <div>Car Price: {car.pricePerDay}</div>
            </div>
        })
    }
    return (
    <div>
        <Navbar></Navbar>
        <div>{showForThisLocation()}</div>
        <div>{error}</div>
        <div>{loading && 'Loading...'}</div>
    </div>
  )
}

export default RenterEachLocation