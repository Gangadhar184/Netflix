import React from 'react'
import Login from './Login'
import Browse from './Browse'
import Error from './Error'
import NotFound from './NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



const Body = () => {


    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/browse',
            element: <Browse />
        },
        {
            path: '/error',
            element: <Error />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ])




    return (
        <>
            <RouterProvider router={appRouter} />
        </>



    )
}

export default Body
