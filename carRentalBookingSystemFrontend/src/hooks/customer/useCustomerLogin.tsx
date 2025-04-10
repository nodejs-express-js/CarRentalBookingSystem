import { useState } from "react"
import { useCustomer } from "./useCustomer"

const useCustomerLogin = () => {
  const [error,setError]=useState("")
  const [loading,setIsLoading]=useState(false)
  const {dispatch}=useCustomer()
  const customerLoginFunction=async(email:string,password:string)=>{
    try{
        setIsLoading(true)
        setError("")
        const response=await fetch(import.meta.env.VITE_BACKEND_URL+`customer/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email: email,
                password: password
            })
        })
        const data=await response.json()
        if(response.ok){
            
            dispatch({type:"ADD_CUSTOMER",payload:data})
        }
        else{
            setError(data.message)
        }
    }
    catch{
      setError("something went wrong during login with server")
    } 
    setIsLoading(false)
  }
  return {error, loading, customerLoginFunction}
}

export default useCustomerLogin