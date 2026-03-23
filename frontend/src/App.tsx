import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <div>
      <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/register' element = {<Register/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '*' element = {<PageNotFound/>}/>
      
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
