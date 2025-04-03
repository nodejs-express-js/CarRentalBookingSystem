import { createContext, useEffect, useReducer } from "react"


type stateType={
    email: string,
    token: string,
    profilePicture: string
}
type actionType1={
    type: "ADD_CUSTOMER",
    payload: stateType
}
type actionType=actionType1

type childrenType={
    children:React.ReactNode
}
type customerContextType={
    state: stateType,
    dispatch: React.Dispatch<actionType>
}

const customerReducer=(state:stateType,action:actionType)=>{
    switch(action.type){
        case "ADD_CUSTOMER":
            localStorage.setItem('customer',JSON.stringify(action.payload))
            return action.payload
        default:
            return state
    }
}




export const CustomerContext=createContext<customerContextType|null>(null);
const CustomerContextProvider = ({children}:childrenType) => {
    const [state,dispatch]=useReducer(customerReducer,{email: "", token: "", profilePicture: ""})
    useEffect(()=>{
        const customer=localStorage.getItem('customer')
        if(customer){
            dispatch({type:'ADD_CUSTOMER',payload:JSON.parse(customer)})
        }else{
            localStorage.removeItem('customer')
        }
     },[])
  return (
  <CustomerContext.Provider value={{state,dispatch}}>
    {children}
  </CustomerContext.Provider>
  )
}

export default CustomerContextProvider