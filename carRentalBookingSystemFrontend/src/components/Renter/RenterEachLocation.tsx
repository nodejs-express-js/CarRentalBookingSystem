import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import useRenterEachLocationFetch from "../../hooks/renter/useRenterEachLocationFetch";
import { useParams } from "react-router-dom";
import useRenterEachLocation from "../../hooks/renter/useRenterEachLocation";
import Styles from './RenterEachLocation.module.css';
import useCreateRenterEachLocation from "../../hooks/renter/useCreateRenterEachLocation";
import deleteIcon from "../../assets/icons8-delete.svg";
import useDeleteRenterEachLocation from "../../hooks/renter/useDeleteRenterEachLocation";
type carDetailsType={
    make: string,
    model: string,
    year: number,
    pricePerDay: number,
    photo: File|null,
    locationId: number,
  };

const RenterEachLocation = () => {
    
  const [carDetails,setCarDetails]=useState<carDetailsType>({make: "",model: "",year: 0,pricePerDay: 0,photo: null,locationId: 0,});
  const fileInputRef = useRef<HTMLInputElement|null>(null);
  const carref = useRef<null>(null);
  const firstref = useRef(true);
  const  {error:formerror,loading:formloading,createRenterEachLocationPost}=useCreateRenterEachLocation();
  const { error, loading, fetchEachLocation } = useRenterEachLocationFetch();
  const {error:deleteerror,loading:deleteloading,deleteEachLocationPost}=useDeleteRenterEachLocation();
  const { locationId } = useParams();
  const [formError,setFormError]=useState("")
  const { state } = useRenterEachLocation();
  
  useEffect(() => {
    const currPage = state.locationCars.filter((car) => {
      if (locationId) return car.locationId === parseInt(locationId);
    });
    if (locationId && currPage.length === 0 && firstref.current) {
      fetchEachLocation(parseInt(locationId), 0, 2);
      firstref.current = false;
    }
  }, [locationId, fetchEachLocation, state.locationCars]);

  useEffect(() => {
    const initialObserver = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const currPage = state.locationCars.filter((car) => {
          if (locationId) return car.locationId === parseInt(locationId);
        });
        if (locationId) {
          await fetchEachLocation(
            parseInt(locationId),
            currPage[0].currPage,
            currPage[0].currPage + 2
          );
        }
      }
    }, { threshold: 0.5 });
    const currentLastElement = carref.current;
    if (currentLastElement) {
      initialObserver.observe(currentLastElement);
    }
    return () => {
      if (currentLastElement) {
        initialObserver.unobserve(currentLastElement);
      }
    };
  }, [state]);





  const deletecar=async(id:number)=>{
    if(!deleteloading && locationId)
      await deleteEachLocationPost(id,parseInt(locationId))
  }

  const addcar =async()=>{
    setFormError("")
    if(carDetails.make==="" || carDetails.model==="" || carDetails.year==0 || carDetails.pricePerDay==0 || carDetails.photo===null){
        setFormError("All fields are required");
        return;
    }
    if(locationId){
        const currPage = state.locationCars.filter((car) => {
            if (locationId) return car.locationId === parseInt(locationId);
          })
          
          if(currPage[0]){
            await createRenterEachLocationPost({
              ...carDetails,
              locationId: parseInt(locationId),
            },currPage[0].currPage);
          }
          else{
            await createRenterEachLocationPost({
              ...carDetails,
              locationId: parseInt(locationId),
            },3);
          }
    }
    else{
        setFormError("Location not found");
        return;
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    setCarDetails({
        make: "",
        model: "",
        year: 0,
        pricePerDay: 0,
        photo:null,
        locationId: 0,
      });
    }



  const showForThisLocation = () => {
    const currPage = state.locationCars.filter((car) => {
      if (locationId) return car.locationId === parseInt(locationId);
    });

    if (currPage.length !== 0) {
      return currPage[0].cars.map((car, index) => {
        return (
          <div
            key={index}
            ref={index === currPage[0].cars.length - 1 ? carref : null}
            className={Styles.carItem}
          >
            <div>
                <div className={Styles.carBrand}>Car brand: {car.make} </div>
                
                <div className={Styles.carModel}>Car Name: {car.model}</div>
                <div className={Styles.carPhoto}>
                  Car Photo: <img src={car.photo} alt={car.model} />
                </div>
                <div className={Styles.carYear}>Car Description: {car.year}</div>
                <div className={Styles.carPrice}>Car Price: {car.pricePerDay}</div>
            </div>
            <img src={deleteIcon} className={Styles.deleteicon} alt="x" onClick={()=>{deletecar(car.id)}} ></img>
            
          </div>
        );
      });
    } else {
      return <></>;
    }
  };

    

   

  return (
    <div >
      <Navbar />
      <div className={Styles.container}>
      <div className={Styles.left}>
        <h1>Cars available</h1>
            <div className={Styles.loading} >{deleteerror}</div>
            <div className={Styles.carGrid}>{showForThisLocation()}</div>
            <div className={Styles.error}>{error}</div>
            <div className={Styles.loading}>{loading && "Loading..."}</div>
            
      </div>
   <div className={Styles.carFormContainer}>
      
      <label>make</label>
      <input
        type="text"
        name="make"
        onChange={(e) =>
          setCarDetails({ ...carDetails, make: e.target.value })
        }
        value={carDetails.make}
      />
      <label>model</label>
      <input
        type="text"
        name="model"
        onChange={(e) =>
          setCarDetails({ ...carDetails, model: e.target.value })
        }
        value={carDetails.model}
      />
      <label>year</label>
      <input
        type="number"
        name="year"
        onChange={(e) =>
          setCarDetails({ ...carDetails, year: parseInt(e.target.value) })
        }
        value={carDetails.year}
      />
      <label>price per day</label>
      <input
        type="number"
        name="pricePerDay"
        onChange={(e) =>
          setCarDetails({ ...carDetails, pricePerDay: parseFloat(e.target.value) })
        }
        value={carDetails.pricePerDay}
      />
      
      <label>car photo</label>
      <input
        type="file"
        accept="image/*"
        name="photo"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setCarDetails({
              ...carDetails,
              photo: e.target.files[0],
            });
          } else {
            setFormError('Please upload image');
            setCarDetails({ ...carDetails, photo: null });
          }
        }}
        ref={fileInputRef}
      />
      <div>{formError}</div>
      <div>{formerror}</div>
      <button onClick={() => addcar()} disabled={formloading}>Add Car</button>
    </div>
    </div>
     
    </div>
  );
};

export default RenterEachLocation;