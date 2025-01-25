import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { routes } from './routes/routes';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='w-full min-[1920px]:max-w-[120rem] mx-auto'>
      <RouterProvider router={routes} />
    </div>
  </StrictMode>,
)
