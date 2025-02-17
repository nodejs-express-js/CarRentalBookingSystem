import { createContext, ReactNode, useEffect, useReducer } from "react"

type renterStateType={
    email:string;
    token:string;
    profilePicture:string;
}
type actionType={
    type:string;
    payload?:renterStateType;
}
type childrenType={
    children:ReactNode;
}
type RenterContextProviderType={
    state:renterStateType;
    dispatch:React.Dispatch<actionType>;
}
const renterReducer=(state:renterStateType,action:actionType)=>{
    switch(action.type){
        case 'ADD_RENTER':
            return state;
        default:
            return state;
    }
}
export const RenterContext=createContext<null|RenterContextProviderType>(null);


const RenterContextProvider = ({children}:childrenType) => {

    const [state,dispatch]=useReducer(renterReducer,{
        email:'',
        token:'',
        profilePicture:'',
    });

     useEffect(()=>{

        
     },[])

  return (
    <RenterContext.Provider value={{state,dispatch}}>
        {children}
    </RenterContext.Provider>
  )
}

export default RenterContextProvider