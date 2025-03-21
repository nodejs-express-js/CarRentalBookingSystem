import { createContext, useReducer } from "react";

type Car={
    id: number;
    make: string;
    model: string;
    year: number;
    pricePerDay: string;
    photo: string;
    locationId: number;
    createdAt: string;
    updatedAt: string;
} 
type LocationCars ={
    currPage:number;
    locationId:number;
    cars : Car[]; // Allows dynamic location IDs as keys
} 
type LocationCarsResponse= {
    currlocationId: string; // Current location id.
    locationCars: LocationCars[];
}
type actiontype1={
    type: 'ADD_LOCATION_CARS';
    payload: LocationCars; 
}
type actiontype2={
    type: 'SET_CURRENT_LOCATION';
    payload: string; 
}
type actiontype3={
    type: 'DELETE_ALL';
}
type actiontype=actiontype1|actiontype2|actiontype3
type childrenType={
    children:React.ReactNode
}
type renterEachLocation={ 
    state: LocationCarsResponse; dispatch: React.ActionDispatch<[action: actiontype]>; 
}

const RenterEachLocationReducer=(state:LocationCarsResponse,action:actiontype)=>{
    switch(action.type){
        case "SET_CURRENT_LOCATION":
            return {...state, currlocationId:action.payload};
        case 'ADD_LOCATION_CARS':{
            
            const temp=state.locationCars.filter((c)=>{return c.locationId === action.payload.locationId})
            let add;
            if(temp[0]){
                add={
                    currPage:action.payload.currPage,
                    locationId:action.payload.locationId,
                    cars:[...temp[0].cars,...action.payload.cars]
                }
            }
           else{
            add={
                currPage:action.payload.currPage,
                locationId:action.payload.locationId,
                cars:action.payload.cars
            }
           }
           console.log(temp,add)
            return {currlocationId:state.currlocationId, locationCars:[
                ...state.locationCars.filter((c)=>{return c.locationId !== action.payload.locationId}),
                add
            ]};
            }
        case "DELETE_ALL":
            return {locationCars:[],currlocationId:""};
        default:
            return state;
    }
}

export const RenterEachLocationContext =createContext<renterEachLocation|null>(null); 

const RenterEachLocationContextProvider = ({children}:childrenType) => {
  const [state,dispatch]=useReducer(RenterEachLocationReducer,{locationCars:[],currlocationId:""});  
    return (
    <RenterEachLocationContext.Provider value={{state,dispatch}}>
        {children}
    </RenterEachLocationContext.Provider>
  )
}

export default RenterEachLocationContextProvider