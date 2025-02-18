
// import Styles from './App.module.css'
import Home from './components/Home'
import Login from './components/Login'
import { Routes,Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import useRenter from './hooks/useRenter';
function App() {
  const {state}=useRenter();
  return (
    <>
    <Routes>
      <Route path='/' element={state.email==='' ? <Login/> : <Home/> } ></Route>
      <Route path='/login' element={state.email!=='' ?  <Home/> :<Login/>  } ></Route>
      <Route path='/signup' element={state.email!=='' ?  <Home/> :<SignUp/>  } ></Route>
    </Routes>
     
    </>
  )
}

export default App
