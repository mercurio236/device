import { createBrowserRouter } from 'react-router-dom'
import { Home } from './Home'
import { AppLayout } from './_layouts/app'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children:[
      {
        path:'/:id',
        element: <Home/>
      }
    ]
  },
])
