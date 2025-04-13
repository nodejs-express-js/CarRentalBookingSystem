import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar"
import useCustomerFetchEachLocationCars,{Car} from "../../hooks/customer/useCustomerFetchEachLocationCars";
import { useEffect, useRef, useState } from "react";
import styles from './CustomerEachLocation.module.css';



export const CustomerEachLocation = () => {
  const { locationId } = useParams();
    const {error,loading,fetchfewcars}=useCustomerFetchEachLocationCars();
    const [cars,setCars]=useState<Car[]>([]);
    const [currPage,setCurrPage]=useState(3);
    const [reachedEnd,setReachedEnd]=useState(false);
    const ref=useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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

    const handleBooking=(car:Car)=>{
      navigate('/customerbooking', { state: { car } });

    }


    const showcars = () => {
      return (
        <div className={styles.container}>
          {cars.map((car, index) => {
            const card = (
              <div key={car.id} className={styles.card}>
                <img src={car.photo} alt={`${car.make} ${car.model}`} />
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Price Per Day:</strong> ${car.pricePerDay}</p>
              </div>
            );
    
            if (index === cars.length - 1) {
              return (
                <div ref={ref} key={index} onClick={()=>{handleBooking(car)}}>
                  {card}
                </div>
              );
            } else {
              return <div key={index} onClick={()=>{handleBooking(car)}}>{card}</div>;
            }
          })}
        </div>
      );
    };
    


  
  return (
    <div>
        <Navbar></Navbar>
        <div>{loading}</div>
        <div>{error}</div>
        <h2>Available Cars</h2>
        <>{showcars()}</>
        <>{reachedEnd ? "have reached end" : ""}</>
    </div>
  )
}
