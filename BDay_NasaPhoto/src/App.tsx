import './App.css'

import { Outlet } from 'react-router-dom'
import { NasaForm } from './components/NasaForm/NasaForm'

function App() {
  return (
    <>
      <Outlet/>
      <NasaForm/>
    </>
  )
}
export default App
