import { createContext, ReactNode,  useReducer } from "react";

type stateType={
    locations: CarRentalLocation[]
    currPage:number
}
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
    payload:stateType; // Depends on the action type
}
type actionType4={
    type:"DELETE_LOCATION";
    payload:number; // Depends on the action type
}
type actionType5={
    type:"DELETE_ALL";
}
type actionType6={
    type:"SET_CURR_PAGE";
    payload:number; // Depends on the action type
}
type actionType=actionType1|actionType2|actionType3|actionType4|actionType5|actionType6

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
    state: stateType;
    dispatch: React.Dispatch<actionType>;
}

const renterLocationReducer=(state:stateType,action:actionType)=>{
    switch(action.type){
        case 'SET_CURR_PAGE':
            return {...state,currPage:action.payload}
        case 'UPDATE_LOCATION':
            return {locations:[...state.locations,action.payload],currPage:state.currPage}
        case 'INITIALIZE_LOCATIONS':
            return action.payload
        case "ADD_LOCATIONS":
            return {locations:[...state.locations,...action.payload],currPage:state.currPage}
        case "DELETE_LOCATION":
            return {locations:state.locations.filter(location=>location.id!==action.payload),currPage:state.currPage};
        case "DELETE_ALL":
            return {locations:[],currPage:0}
        default:
            return state;
    }
}



export const RenterLocationContext=createContext<null|renterLocationContextType>(null);



const RenterLocationProvider = ({children}:childrenType) => {
    const [state,dispatch]=useReducer(renterLocationReducer,{locations:[],currPage:0})
  

  return (
    <RenterLocationContext.Provider value={{state,dispatch}}>
        {children}
    </RenterLocationContext.Provider>
  )
}

export default RenterLocationProvider