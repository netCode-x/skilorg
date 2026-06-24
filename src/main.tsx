import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from '@/App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import routers from "@/routers";

const router = createBrowserRouter(routers)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
        <RouterProvider router={router}/>
    </StrictMode>,
)
