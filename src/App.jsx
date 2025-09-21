import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Home} from "./pages/Home"
import { NotFound } from './pages/NotFound'
import { GetStarted } from './pages/GetStarted'
import { Chat } from './pages/Chat'
import { Layout } from './Layout'

function App (){
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element ={<Home />} />
        <Route path='/GetStarted' element ={<GetStarted/>}/>
        <Route path='/Chat' element ={<Chat/>}/>
        <Route path='/error404' element ={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
