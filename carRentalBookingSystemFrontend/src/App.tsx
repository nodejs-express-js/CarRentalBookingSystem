
import Styles from './App.module.css'
import Home from './components/Home'
import Login from './components/Login'
import { Routes,Route } from 'react-router-dom'
import SignUp from './components/SignUp'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' Component={Home}></Route>
      <Route path='/login' Component={Login}></Route>
      <Route path='/signup' Component={SignUp}></Route>
    </Routes>
     
    </>
  )
}

export default App
