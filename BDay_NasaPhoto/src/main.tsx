import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom'
import { NasaPicture } from './routes/NasaPicture.tsx'

const routes = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path: "/",
        element: <NasaPicture/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
