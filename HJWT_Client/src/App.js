import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import PageNotFound from './Pages/PageNotFound'
import Loginpage from './Pages/Loginpage'
import CreateAccount from './Pages/CreateAccount'
import Urlsforshowing from './Pages/Urlsforshowing'
import Homepage from './Pages/Homepage'
import Credits from './Pages/Credits'
import Logindemopage from './Pages/Logindemopage'
import Metamasklogin from './Pages/Metamasklogin'


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/logindemopage" element={<Logindemopage/>}/>
          <Route path="/loginpage" element={<Loginpage/>}/>
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/createaccount" element={<CreateAccount/>}/>
          {/* <Route path="/urls" element={<Urlsforshowing/>}/> */}
          <Route path="/urls/:username" element={<Urlsforshowing />} />
          <Route path="/" element={<Homepage/>}/>
          <Route path="/credits" element ={<Credits/>}/>
          <Route path="/mymetamask/:username" element ={<Metamasklogin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
