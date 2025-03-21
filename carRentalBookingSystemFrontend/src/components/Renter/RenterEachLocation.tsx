import { useEffect, useRef, useState } from "react"
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
        const currPage=state.locationCars.filter((car)=>{
            if(locationId)
            return car.locationId===parseInt(locationId)
        })
        if(locationId && currPage.length==0 )
            fetchEachLocation(parseInt(locationId),0,2)     
            
    },[locationId])
    useEffect(()=>{
        const initialObserver=new IntersectionObserver(async(entries)=>{
            console.log("++++++++++++++++++++++++++",state)
            if(entries[0].isIntersecting){
                const currPage=state.locationCars.filter((car)=>{
                    if(locationId)
                    return car.locationId===parseInt(locationId)
                })
                if(locationId)
                    await fetchEachLocation(parseInt(locationId),currPage[0].currPage,currPage[0].currPage+2)
                    
            }
        },{
            threshold: 1
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
    },[state])
    
    const showForThisLocation=()=>{
        const currPage=state.locationCars.filter((car)=>{
            if(locationId)
            return car.locationId===parseInt(locationId)
        })
        
        if(currPage.length!==0){
            return currPage[0].cars.map((car,index)=>{
                return <div key={index} 
                    ref={index===currPage[0].cars.length-1 ? carref : null}
                >
                    <div>Car brand: {car.make}</div>
                    <div>Car Name: {car.model}</div>
                    <div>Car Photo: <img src={car.photo} alt={car.model} /></div>
                    <div>Car Description: {car.year}</div>
                    <div>Car Price: {car.pricePerDay}</div>
                </div>
            })
        }
        else{
            return <></>
        }
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