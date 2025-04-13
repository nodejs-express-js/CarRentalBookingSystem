import { useParams } from "react-router-dom";
import Navbar from "./Navbar"
import useCustomerFetchEachLocationCars,{Car} from "../../hooks/customer/useCustomerFetchEachLocationCars";
import { useEffect, useRef, useState } from "react";

export const CustomerEachLocation = () => {
  const { locationId } = useParams();
    const {error,loading,fetchfewcars}=useCustomerFetchEachLocationCars();
    const [cars,setCars]=useState<Car[]>([]);
    const [currPage,setCurrPage]=useState(3);
    const [reachedEnd,setReachedEnd]=useState(false);
    const ref=useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const initialUpdate=async()=>{
          if(locationId)
          {
            setCars(await fetchfewcars(0,2,parseInt(locationId)));
          }
        }
        initialUpdate()
    },[])

    useEffect(()=>{
    
      const initalobserver=new IntersectionObserver(async(entries)=>{
        if(entries[0].isIntersecting){
          if(locationId && !reachedEnd){
            const resp=await fetchfewcars(currPage,currPage+2,parseInt(locationId));
            if(resp.length==0){
                setReachedEnd(true)
            }
            else{
              setCars(cars=>{return [...cars,...resp]});
              setCurrPage(currPage=>currPage+3)
            }
            
          }
        }
      },{
        threshold:0.1
      })
      if(ref.current)
        initalobserver.observe(ref.current)
      let temp:HTMLDivElement;
      if(ref.current)
        temp=ref.current;
        return () => {
          if (temp) {
            initalobserver.unobserve(temp)
          }
        };
    },[cars])



    const showcars=()=>{
      return cars.map((car,index)=>{
        if(index==cars.length-1){
          return   (
            <div ref={ref} key={index}>
             
              {
                <div key={car.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                  <img src={car.photo} alt={`${car.make} ${car.model}`} style={{ maxWidth: '200px', height: 'auto' }} />
                  <p><strong>Make:</strong> {car.make}</p>
                  <p><strong>Model:</strong> {car.model}</p>
                  <p><strong>Year:</strong> {car.year}</p>
                  <p><strong>Price Per Day:</strong> ${car.pricePerDay}</p>
                  <p><strong>Location ID:</strong> {car.locationId}</p>
                  <p><strong>Created At:</strong> {new Date(car.createdAt).toLocaleDateString()} {new Date(car.createdAt).toLocaleTimeString()}</p>
                  <p><strong>Updated At:</strong> {new Date(car.updatedAt).toLocaleDateString()} {new Date(car.updatedAt).toLocaleTimeString()}</p>
                </div>
              }
            </div>)
        }
        else{
          return   (
            <div key={index}>
              {
                <div key={car.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                  <img src={car.photo} alt={`${car.make} ${car.model}`} style={{ maxWidth: '200px', height: 'auto' }} />
                  <p><strong>Make:</strong> {car.make}</p>
                  <p><strong>Model:</strong> {car.model}</p>
                  <p><strong>Year:</strong> {car.year}</p>
                  <p><strong>Price Per Day:</strong> ${car.pricePerDay}</p>
                  <p><strong>Location ID:</strong> {car.locationId}</p>
                  <p><strong>Created At:</strong> {new Date(car.createdAt).toLocaleDateString()} {new Date(car.createdAt).toLocaleTimeString()}</p>
                  <p><strong>Updated At:</strong> {new Date(car.updatedAt).toLocaleDateString()} {new Date(car.updatedAt).toLocaleTimeString()}</p>
                </div>
              }
            </div>)
        }
      })
    }


  
  return (
    <div>
        <Navbar></Navbar>
        id: {locationId}
        <div>{loading}</div>
        <div>{error}</div>
        <h2>Available Cars</h2>
        <>{showcars()}</>
        <>{reachedEnd ? "have reached end" : ""}</>
    </div>
  )
}
