import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom'
import { TodaysPicture } from './components/TodaysPicture/TodaysPicture.tsx'
import { DatePicture } from './components/DatePicture/DatePicture.tsx'


const routes = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path: "/",
        element: <TodaysPicture/>
      },
      {
        path: "/my-date-picture",
        element: <DatePicture/>
      },
      
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
