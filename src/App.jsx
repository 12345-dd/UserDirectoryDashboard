import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import UserDetail from './components/UserDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
  )
}

export default App
