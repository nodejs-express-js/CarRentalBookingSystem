import { useNavigate } from "react-router-dom";
import Styles from './Navbar.module.css'
import { useCustomer } from "../../hooks/customer/useCustomer";

const Navbar = () => {
    const {state,dispatch}=useCustomer();
   
    const navigate=useNavigate();
  return (
    <div className={Styles.container}>

        <div onClick={()=>{navigate("/")}} className={Styles.home}>Car Rental</div>
        {state.token!==''
         ? 
         <div className={Styles.wrapper}>
          <div className={Styles.order} onClick={()=>{ navigate("/customerorders") }}>Orders</div>
          <div className={Styles.minicontainer1}>
              <img src={state.profilePicture} alt="profile pic" className={Styles.profilePic}></img>
              <div>
                <div>Welcome {state.email}</div> 
                <div onClick={()=>{navigate("/");dispatch({type:"ADD_CUSTOMER",payload:{email:'',token:'',profilePicture:'',}})}}>logout</div>
              </div>
            </div>
          </div>
         :
        <div className={Styles.minicontainer2}>
            <div onClick={()=>{navigate("/customerlogin")}}>Login</div>
            <div onClick={()=>{navigate("/customersignup")}}>Signup</div>
        </div>
     }
    </div>
  )
}

export default Navbar