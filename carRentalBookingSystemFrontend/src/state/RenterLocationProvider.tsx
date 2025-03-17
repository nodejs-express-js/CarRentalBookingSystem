import { createContext, ReactNode,  useReducer } from "react";

type actionType1={
    type:"UPDATE_LOCATION";
    payload:CarRentalLocation; // Depends on the action type
}
type actionType2={
    type:"ADD_LOCATIONS";
    payload:CarRentalLocation[]; // Depends on the action type
}
type actionType3={
    type:"INITIALIZE_LOCATIONS";
    payload:CarRentalLocation[]; // Depends on the action type
}
type actionType4={
    type:"DELETE_LOCATION";
    payload:number; // Depends on the action type
}

type actionType=actionType1|actionType2|actionType3|actionType4

type childrenType={
    children:ReactNode;
}
type CarRentalLocation = {
    id: number;
    name: string;
    city: string;
    carRentalPhoto: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string; 
    carRentalId: number;
};
type renterLocationContextType={
    state: CarRentalLocation[];
    dispatch: React.Dispatch<actionType>;
}

const renterLocationReducer=(state:CarRentalLocation[],action:actionType)=>{
    switch(action.type){
        case 'UPDATE_LOCATION':
            return [...state,action.payload]
        case 'INITIALIZE_LOCATIONS':
            return action.payload
        case "ADD_LOCATIONS":
            return [...state,...action.payload]
        case "DELETE_LOCATION":{
            return state.filter(location=>location.id!==action.payload);
        }
        default:
            return state;
    }
}



export const RenterLocationContext=createContext<null|renterLocationContextType>(null);



const RenterLocationProvider = ({children}:childrenType) => {
    const [state,dispatch]=useReducer(renterLocationReducer,[])
  

  return (
    <RenterLocationContext.Provider value={{state,dispatch}}>
        {children}
    </RenterLocationContext.Provider>
  )
}

export default RenterLocationProvider