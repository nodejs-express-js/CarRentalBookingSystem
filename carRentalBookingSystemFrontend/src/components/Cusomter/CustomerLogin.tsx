import { useState } from "react"
import Navbar from "./Navbar"
import useCustomerLogin from "../../hooks/customer/useCustomerLogin"
const CustomerLogin = () => {
    const [formInput,setFormInput]=useState({
        email: '',
        password: ''
    })
    const {error, loading, customerLoginFunction}=useCustomerLogin()
    const login=async()=>{
        if(formInput.email==="" || formInput.password===""){
            alert("Please enter email and password")
            return;
        }
        customerLoginFunction(formInput.email,formInput.password)
    }
  return (
    <div>
        <Navbar></Navbar>
            <h1>Customer Login</h1>
            <div>
                <label>Email</label>
                <input type="text" placeholder="Email" name="email" onChange={(e)=>{
                    setFormInput({...formInput,email:e.target.value})
                }}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>{
                    setFormInput({...formInput,password:e.target.value})
                }}/>
            </div>
            <div>{error}</div>
            <button type="submit" onClick={login} disabled={loading}>Login</button>
    </div>
  )
}

export default CustomerLogin