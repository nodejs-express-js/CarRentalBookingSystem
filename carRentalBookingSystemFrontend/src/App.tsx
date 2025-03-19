
// import Styles from './App.module.css'
import RenterHome from './components/Renter/RenterHome'
import Login from './components/Renter/Login'
import { Routes,Route } from 'react-router-dom'
import SignUp from './components/Renter/SignUp'
import useRenter from './hooks/useRenter';
import RenterEachLocation from './components/Renter/RenterEachLocation';
function App() {
  const {state}=useRenter();
  return (
    <>
    <Routes>
      <Route path='/' element={state.email==='' ? <Login/> : <RenterHome/> } ></Route>
      <Route path='/eachlocation/:locationId' element={state.email==='' ?  <Login/> :<RenterEachLocation/>}></Route>
      <Route path='/login' element={state.email!=='' ?  <RenterHome/> :<Login/>  } ></Route>
      <Route path='/signup' element={state.email!=='' ?  <RenterHome/> :<SignUp/>  } ></Route>
      
    </Routes>
     
    </>
  )
}

export default App
