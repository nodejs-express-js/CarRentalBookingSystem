import { useContext } from "react"
import {RenterLocationContext} from '../../state/RenterLocationProvider'
const useRenterLocation = () => {
 const context=useContext(RenterLocationContext);
 if(!context){
    throw new Error("renter location context should be used inside renterlocation context")
 }
 return context;
}

export default useRenterLocation