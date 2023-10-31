import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
const App = () => {
  return (
    <div className="App">
   <BrowserRouter>
     <Routes>
       <Route path='/' >
         <Route path='/'  element={<Home/>}/>
         <Route path='chat'  element={<Chat/>}/>
       </Route>
     </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
