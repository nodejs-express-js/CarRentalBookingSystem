import { useState } from "react"
import {formInputType} from "../../components/Cusomter/CustomerSignup"
import { useCustomer } from "./useCustomer"

const useCustomerSignup = () => {
    const [error,setError]=useState("")
    const [loading,setIsLoading]=useState(false)
    const {dispatch}=useCustomer()
    const signupCustomer=async(formInput:formInputType)=>{
        
        try{
            setError("")
            setIsLoading(true)
            const formdata=new FormData()
            formdata.append("firstName",formInput.firstName)
            formdata.append("lastName",formInput.lastName)
            formdata.append("email",formInput.email)
            formdata.append("password",formInput.password)
            formdata.append("address",formInput.address)
            formdata.append("phoneNumber",formInput.phoneNumber)
            if(formInput.profilePicture){
                formdata.append("profilePicture",formInput.profilePicture)
            }
            const response=await fetch(import.meta.env.VITE_BACKEND_URL+"customer/signup",{
                method:"POST",
                body:formdata
            })
            const data=await response.json()
            if(response.ok){
                dispatch({type:"ADD_CUSTOMER",payload:data})
            } else{
                setError(data.message)
            }

        } catch{
           setError("something went wrong with server authentication")
            
        }
        setIsLoading(false)
    }
    return {signupCustomer, error, loading}
}

export default useCustomerSignup