import { useContext } from "react"
import { RenterContext } from "../../state/RenterContextProvider"
const useRenter = () => {
  const context=useContext(RenterContext)
  if(!context) throw new Error("RenterContext provider is not available")
    return context;
}

export default useRenter