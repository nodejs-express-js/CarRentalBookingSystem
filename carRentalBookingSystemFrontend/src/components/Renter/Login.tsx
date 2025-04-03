import { useState } from "react"
import Navbar from "./Navbar"
import useRenterLogin from "../../hooks/renter/useRenterLogin";

const Login = () => {
    const [loginInfo,setLoginInfo] = useState({email:'',password:''});
    const {error,loading,loginRenter}=useRenterLogin();
    const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(loginInfo.email==='' || loginInfo.password==='') {
            alert('Please enter email and password');
            return;
        }
        loginRenter(loginInfo.email, loginInfo.password);
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
            <div>{error}</div>
            <button onClick={(e)=>{handleSubmit(e)}} disabled={loading}>Login</button>
        </form>
    </div>
  )
}

export default Login