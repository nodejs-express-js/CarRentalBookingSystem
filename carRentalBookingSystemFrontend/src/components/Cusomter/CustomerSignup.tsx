import { useRef, useState } from "react"
import Navbar from "./Navbar"
import useCustomerSignup from "../../hooks/customer/useCustomerSignup"
import Styles from './CustomerSignup.module.css'

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
    const signup=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
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
    <div className={Styles.container}>
    <Navbar />
    <form className={Styles.signupForm} onSubmit={signup}>
      <h1 className={Styles.header}>Signup</h1>
      <div className={Styles.inputGroup}>
        <label htmlFor="firstName" className={Styles.label}>
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          className={Styles.inputField}
          value={formInput.firstName}
          onChange={(e) =>
            setFormInput({ ...formInput, firstName: e.target.value })
          }
          required
        />
      </div>
      <div className={Styles.inputGroup}>
        <label htmlFor="lastName" className={Styles.label}>
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          className={Styles.inputField}
          value={formInput.lastName}
          onChange={(e) =>
            setFormInput({ ...formInput, lastName: e.target.value })
          }
          required
        />
      </div>
      <div className={Styles.inputGroup}>
        <label htmlFor="email" className={Styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className={Styles.inputField}
          value={formInput.email}
          onChange={(e) =>
            setFormInput({ ...formInput, email: e.target.value })
          }
          required
        />
      </div>
      <div className={Styles.inputGroup}>
        <label htmlFor="password" className={Styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={Styles.inputField}
          value={formInput.password}
          onChange={(e) =>
            setFormInput({ ...formInput, password: e.target.value })
          }
          required
        />
      </div>
      <div className={Styles.inputGroup}>
        <label htmlFor="confirmPassword" className={Styles.label}>
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className={Styles.inputField}
          value={formInput.confirmPassword}
          onChange={(e) =>
            setFormInput({ ...formInput, confirmPassword: e.target.value })
          }
          required
        />
      </div>
      <div className={Styles.inputGroup}>
        <label htmlFor="address" className={Styles.label}>
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Address"
          className={Styles.inputField}
          value={formInput.address}
          onChange={(e) =>
            setFormInput({ ...formInput, address: e.target.value })
          }
          required
        />
      </div>
      <div className={Styles.inputGroup}>
        <label htmlFor="phoneNumber" className={Styles.label}>
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          placeholder="Phone Number"
          className={Styles.inputField}
          value={formInput.phoneNumber}
          onChange={(e) =>
            setFormInput({ ...formInput, phoneNumber: e.target.value })
          }
          required
        />
      </div>
      <div className={Styles.inputGroup}>
        <label htmlFor="profilePicture" className={Styles.label}>
          Profile Picture
        </label>
        <input
          type="file"
          id="profilePicture"
          className={Styles.fileInput}
          onChange={(e) => {
            if (e.target.files && e.target.files.length)
              setFormInput({ ...formInput, profilePicture: e.target.files[0] });
          }}
          ref={profilePic}
        />
      </div>
      {error && <p className={Styles.errorMessage}>{error}</p>}
      <button
        type="submit"
        className={Styles.submitButton}
        disabled={loading}
      >
        Signup
      </button>
    </form>
  </div>
  )
}

export default CustomerSignup