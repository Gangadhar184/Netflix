import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"


const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);

    const handleToggle = () => {
        setIsSignIn(!isSignIn);
    };
    const handleForm = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignIn) {
            //SignUp logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        } else {
            //SignIn logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }


    };

    return (
        <>
            <Header />
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md text-white bg-black px-10 py-14 w-100 space-y-4"
            >
                <h3>{isSignIn ? "Sign In" : "Sign Up"}</h3>
                {!isSignIn && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white-600"
                    />
                )}
                <input
                    ref={email}
                    className="w-full rounded bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white-600"
                    type="text"
                    name="text"
                    placeholder="Email or phonenumber"
                />
                <input
                    ref={password}
                    className="w-full rounded bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white-600"
                    type="password"
                    placeholder="Password"
                />
                <button
                    onClick={handleForm}
                    className="w-full bg-red-600 rounded py-2 font-semibold cursor-pointer"
                >
                    {isSignIn ? "Sign In" : "Sign Up"}
                </button>
                <p className="text-red-800 ">{errorMessage}</p>
                <p>
                    {isSignIn ? "New to Netflix ?" : "Already a user ? "}{" "}
                    <span
                        onClick={handleToggle}
                        className="hover:underline cursor-pointer"
                    >
                        {isSignIn ? "SignUp" : "SignIn"}
                    </span>
                </p>
            </form>
        </>
    );
};

export default Login;
