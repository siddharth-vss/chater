import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Protect from './component/ProtectedRoute'
const App = () => {
  return (
    <div className="App">
   <BrowserRouter>
     <Routes>
       
         <Route path='/'  element={<Home/>}/>
         <Route path='/chats'  element={<Protect><Chat/></Protect>}></Route>
       
     </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
