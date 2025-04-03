import { useContext } from "react"
import {CustomerContext} from "../../state/CustomerContextProvider"
export const useCustomer = () => {
 const context=useContext(CustomerContext)
 if(!context) throw new Error("CustomerContext provider is not available")
    return context;
}
