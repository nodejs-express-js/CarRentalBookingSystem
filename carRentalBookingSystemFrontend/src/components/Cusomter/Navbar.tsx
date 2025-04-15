import { useNavigate } from "react-router-dom";
import Styles from './Navbar.module.css'
import { useCustomer } from "../../hooks/customer/useCustomer";
import logo from '../../assets/logo.png'
const Navbar = () => {
    const {state,dispatch}=useCustomer();
   
    const navigate=useNavigate();
  return (
    <div className={Styles.container}>
        <div onClick={()=>{navigate("/")}} className={Styles.homewrapper}>
          <img src={logo} className={Styles.logo}></img>
          <div className={Styles.home}>Golden Gear Drive</div>
        </div>
        
        {state.token!==''
         ? 
         <div className={Styles.wrapper}>
          <div className={Styles.minicontainer1}>
              <img src={state.profilePicture} alt="profile pic" className={Styles.profilePic}></img>
              <div>
                <div className={Styles.email}>Welcome {state.email}</div> 
                <div className={Styles.order} onClick={()=>{ navigate("/customerorders") }}>Orders</div>
                <div className={Styles.logout} onClick={()=>{navigate("/");dispatch({type:"ADD_CUSTOMER",payload:{email:'',token:'',profilePicture:'',}})}}>logout</div>
              </div>
              
            </div>
          </div>
         :
        <div className={Styles.minicontainer2}>
            <div className={Styles.login} onClick={()=>{navigate("/customerlogin")}}>Login</div>
            <div className={Styles.signup} onClick={()=>{navigate("/customersignup")}}>Signup</div>
        </div>
     }
    </div>
  )
}

export default Navbar