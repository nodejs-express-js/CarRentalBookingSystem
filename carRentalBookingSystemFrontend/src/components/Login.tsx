import { useState } from "react"
import Navbar from "./Navbar"
import useRenterLogin from "../hooks/useRenterLogin";

const Login = () => {
    const [loginInfo,setLoginInfo] = useState({email:'',password:''});
    const [error,loading,loginRenter]=useRenterLogin();
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
     
        if(loginInfo.email==='' || loginInfo.password==='') {
            alert('Please enter email and password');
            return;
        }

    }
  return (
    <div>
        <Navbar></Navbar>
        <form>
            <h1>Login</h1>
            <div>
                <label>Email</label>
                <input type="text" placeholder="Email" name="email" onChange={(e)=>{setLoginInfo({...loginInfo,email:e.target.value})}} value={loginInfo.email}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>{setLoginInfo({...loginInfo,password:e.target.value})}} value={loginInfo.password}/>
            </div>
            <button onClick={(e)=>{handleSubmit(e)}}>Login</button>
        </form>
    </div>
  )
}

export default Login