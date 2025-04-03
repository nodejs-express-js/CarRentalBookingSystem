
// import Styles from './App.module.css'
import RenterHome from './components/Renter/RenterHome'
import Login from './components/Renter/Login'
import { Routes,Route } from 'react-router-dom'
import SignUp from './components/Renter/SignUp'
import useRenter from './hooks/renter/useRenter';
import RenterEachLocation from './components/Renter/RenterEachLocation';
import CustomerLogin from './components/Cusomter/CustomerLogin';
import CustomerHome from './components/Cusomter/CustomerHome';
import { useCustomer } from './hooks/customer/useCustomer';
import CustomerSignup from './components/Cusomter/CustomerSignup';
function App() {
  const {state}=useRenter();
  const {state:customerstate}=useCustomer();
  return (
    <>
    <Routes>
      <Route path='/' element={customerstate.email===''? <CustomerLogin/> : <CustomerHome/> } ></Route>
      <Route path='/customerlogin' element={customerstate.email!==''?  <CustomerHome/> :<CustomerLogin/>  } ></Route>
      <Route path='/customersignup' element={customerstate.email!==''?  <CustomerHome/> :<CustomerSignup/> } ></Route>

      
      <Route path='/renter' element={state.email==='' ? <Login/> : <RenterHome/> } ></Route>
      <Route path='/eachlocation/:locationId' element={state.email==='' ?  <Login/> :<RenterEachLocation/>}></Route>
      <Route path='/login' element={state.email!=='' ?  <RenterHome/> :<Login/>  } ></Route>
      <Route path='/signup' element={state.email!=='' ?  <RenterHome/> :<SignUp/>  } ></Route>
    </Routes>
     
    </>
  )
}

export default App
