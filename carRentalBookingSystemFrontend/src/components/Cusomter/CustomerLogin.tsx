import { useState } from "react"
import Navbar from "./Navbar"
import useCustomerLogin from "../../hooks/customer/useCustomerLogin"
import Styles from "./CustomerLogin.module.css"

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
    <div className={Styles.container}>
        <Navbar></Navbar>
        <div className={Styles.minicontainer}>
        <h1 className={Styles.header}>Customer Login</h1>
            <div className={Styles.input}>
                <label>Email</label>
                <input type="text" placeholder="Email" name="email" onChange={(e)=>{
                    setFormInput({...formInput,email:e.target.value})
                }}/>
            </div>
            <div className={Styles.input}>
                <label>Password</label>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>{
                    setFormInput({...formInput,password:e.target.value})
                }}/>
            </div>
            <div className={Styles.error}>{error}</div>
            <button className={Styles.submit} type="submit" onClick={login} disabled={loading}>Login</button>
        </div>
           
    </div>
  )
}

export default CustomerLogin