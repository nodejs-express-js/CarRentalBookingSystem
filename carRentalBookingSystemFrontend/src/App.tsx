
// import Styles from './App.module.css'
import RenterHome from './components/RenterHome'
import Login from './components/Login'
import { Routes,Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import useRenter from './hooks/useRenter';
function App() {
  const {state}=useRenter();
  return (
    <>
    <Routes>
      <Route path='/' element={state.email==='' ? <Login/> : <RenterHome/> } ></Route>
      <Route path='/login' element={state.email!=='' ?  <RenterHome/> :<Login/>  } ></Route>
      <Route path='/signup' element={state.email!=='' ?  <RenterHome/> :<SignUp/>  } ></Route>
    </Routes>
     
    </>
  )
}

export default App
