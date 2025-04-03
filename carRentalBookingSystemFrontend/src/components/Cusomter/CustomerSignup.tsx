import { useRef, useState } from "react"
import Navbar from "./Navbar"
import useCustomerSignup from "../../hooks/customer/useCustomerSignup"

export type formInputType={
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    address: string,
    phoneNumber: string,
    profilePicture: null|File,
}
const CustomerSignup = () => {
    const [formInput,setFormInput]=useState<formInputType>(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            phoneNumber: '',
            profilePicture: null,
        }
    )
    const {signupCustomer, error, loading}=useCustomerSignup();
    const profilePic=useRef<HTMLInputElement|null>(null);
    const signup=async()=>{
        console.log(formInput)
        if(formInput.password!==formInput.confirmPassword){
            alert("Passwords do not match")
            return
        }
        if(formInput.firstName==='' || formInput.lastName==='' || formInput.email==='' || formInput.password==='' || formInput.confirmPassword==='' || formInput.address==='' || formInput.phoneNumber==='' || formInput.profilePicture===null){
            alert("Please fill all fields")
            return
        }
        signupCustomer(formInput)
        if(error!==""){
            setFormInput({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                phoneNumber: '',
                profilePicture: null,
            })
            if(profilePic.current){
                profilePic.current.value=""
            }
        }
        
        
    }
  return (
    <div>
        <Navbar></Navbar>
        <form>
            <h1>Signup</h1>
            <div>
                <label>First Name</label>
                <input type="text" placeholder="First Name" value={formInput.firstName} onChange={(e)=>setFormInput({...formInput, firstName:e.target.value})} required/>
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" value={formInput.lastName} onChange={(e)=>setFormInput({...formInput, lastName:e.target.value})} required/>
            </div>
            <div>
                <label>Email</label>
                <input type="email" placeholder="Email" value={formInput.email} onChange={(e)=>setFormInput({...formInput, email:e.target.value})} required/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Password" value={formInput.password} onChange={(e)=>setFormInput({...formInput, password:e.target.value})} required/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" value={formInput.confirmPassword} onChange={(e)=>setFormInput({...formInput, confirmPassword:e.target.value})} required/>
            </div>
            <div>
                <label>Address</label>
                <input type="text" placeholder="Address" value={formInput.address} onChange={(e)=>setFormInput({...formInput, address:e.target.value})} required/>
            </div>
            <div>
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" value={formInput.phoneNumber} onChange={(e)=>setFormInput({...formInput, phoneNumber:e.target.value})} required/>
            </div>
            <div>
                <label>Profile Picture</label>
                <input type="file" placeholder="Profile Picture" onChange={(e)=>
                {
                    if(e.target.files && e.target.files.length)
                    setFormInput({...formInput, profilePicture:e.target.files[0]})
                } 
                }
                ref={profilePic}
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit" onClick={signup} disabled={loading}>Signup</button>
        </form>
    </div>
  )
}

export default CustomerSignup