import { useNavigate } from "react-router-dom";
import useRenter from "../hooks/useRenter"
import Styles from './Navbar.module.css'
const Navbar = () => {
    const {state,dispatch}=useRenter();
    const navigate=useNavigate();
  return (
    <div className={Styles.container}>

        <div onClick={()=>{navigate("/")}} className={Styles.home}>CarRental</div>
        {state.token!==''
        
         ? 
         <div className={Styles.minicontainer1}>
          <img src={state.profilePicture} alt="profile pic" className={Styles.profilePic}></img>
          <div>
            <div>Welcome {state.email}</div> 
            <div onClick={()=>{
                navigate("/")
                dispatch({type:"ADD_RENTER",payload:{email:'',token:'',profilePicture:'',}})
                }}>logout</div>
          </div>
        </div>
         
         :
        <div className={Styles.minicontainer2}>
            <div onClick={()=>{navigate("/login")}}>Login</div>
            <div onClick={()=>{navigate("/signup")}}>Signup</div>
        </div>
     }
    </div>
  )
}

export default Navbar