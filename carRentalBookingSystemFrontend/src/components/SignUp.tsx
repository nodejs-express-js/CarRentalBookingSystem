import { useState } from 'react'
import Navbar from './Navbar'

const SignUp = () => {
    const [signupInfo,setSignUpInfo] =useState({
        firstName: "",
        email: "",
        lastName: "",
        password: "",
        phone: "",
        address: "",
        profilePicture: ""
      })

  return (
    <div>
        <Navbar></Navbar>
        SignUp
    </div>
  )
}



export default SignUp