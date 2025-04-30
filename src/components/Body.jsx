import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import Error from './Error'
import NotFound from './NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {

    const dispatch = useDispatch();


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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            } else {
                dispatch(removeUser());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);


    return (
        <>
            <RouterProvider router={appRouter} />
        </>



    )
}

export default Body
