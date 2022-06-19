import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { MakeSignUp } from '@/main/factories/pages/signup/signup-factory'


const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<MakeSignUp />} />
      </Routes>
      <Routes>
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router