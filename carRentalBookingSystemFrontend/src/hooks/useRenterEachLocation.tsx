import { useContext } from "react"
import { RenterEachLocationContext } from "../state/RenterEachLocationContextProvider"


const useRenterEachLocation = () => {
  const context=useContext(RenterEachLocationContext)
  if(!context) throw new Error("RenterEachLocationContext provider is not available")
    return context;
}

export default useRenterEachLocation