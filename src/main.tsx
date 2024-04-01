import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Flowbite } from 'flowbite-react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Help from './Help/index.tsx'
import Dreams from './Dreams/index.tsx'
import Home from './Home/index.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/dreams",
        element: <Dreams />
      },
      {
        path: "/help",
        element: <Help />
      }
    ]
  },

])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Flowbite>
      <RouterProvider router={router} />
    </Flowbite>
  </React.StrictMode>,
)
