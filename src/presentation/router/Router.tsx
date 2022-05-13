import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Factory = {
    MakeLogin: React.FC
    MakeSignUp: React.FC
}

const Router: React.FC<Factory> = ({ MakeLogin, MakeSignUp }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<MakeSignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router