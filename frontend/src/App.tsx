import './App.css'
import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/register' element = {<Register/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '*' element = {<PageNotFound/>}/>
    </Routes>
  )
}

export default App
