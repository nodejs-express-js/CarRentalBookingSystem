import { useNavigate } from "react-router-dom";
import useRenter from "../hooks/useRenter"
import Styles from './Navbar.module.css'
const Navbar = () => {
    const {state}=useRenter();
    const navigate=useNavigate();
  return (
    <div className={Styles.container}>
        <div onClick={()=>{navigate("/")}} className={Styles.home}>CarRental</div>
        {state.token!==''
        
         ? <div>Welcome {state.email}</div> :
        <div className={Styles.minicontainer}>
            <div onClick={()=>{navigate("/login")}}>Login</div>
            <div onClick={()=>{navigate("/signup")}}>Signup</div>
        </div>
     }
    </div>
  )
}

export default Navbar