import React, { useState, useRef } from "react";
import netflix from '../assets/netflix-background.jpg'
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
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
                    // Generate RoboHash avatar URL using the user's UID
                    const robohashUrl = `https://robohash.org/${user.uid}?set=set3&size=150x150`;

                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: robohashUrl
                    }).then(() => {
                        // Profile updated!
                        //we are getting all this from updated values of the user, thats why we are using auth.currentUser instead of user(this user content nonupdated values, oldervalues)
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));

                    }).catch((error) => {
                        // An error occurred with profile update
                        if (error.code && error.code.includes('auth')) {
                            setErrorMessage(error.message);
                        } else {

                            navigate('/error');
                        }
                    });


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // For authentication errors, show in the form
                    if (errorCode && errorCode.includes('auth')) {
                        setErrorMessage(errorCode + " - " + errorMessage);
                    } else {

                        navigate('/error');
                    }
                });

        } else {
            //SignIn logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // For authentication errors, show in the form
                    if (errorCode && errorCode.includes('auth')) {
                        setErrorMessage(errorCode + " - " + errorMessage);
                    } else {
                        // For more serious errors, redirect to error page
                        navigate('/error');
                    }
                });
        }


    };

    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 z-0">
                <img
                    src={netflix}
                    alt="background"
                    className="object-cover w-full h-full brightness-50"
                />
                <div className="absolute inset-0  bg-opacity-50"></div>
            </div>

            <div className="relative z-10">
                <Header />

                <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
                    <div className="w-full max-w-md mx-4 sm:mx-auto">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="bg-black bg-opacity-80 rounded-md text-white px-6 py-10 sm:px-10 sm:py-14 space-y-4"
                        >
                            <h3 className="text-2xl font-bold mb-6">{isSignIn ? "Sign In" : "Sign Up"}</h3>
                            {!isSignIn && (
                                <input
                                    ref={name}
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full rounded bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                            )}
                            <input
                                ref={email}
                                className="w-full rounded bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                                type="text"
                                name="text"
                                placeholder="Email"
                            />
                            <input
                                ref={password}
                                className="w-full rounded bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                                type="password"
                                placeholder="Password"
                            />
                            <button
                                onClick={handleForm}
                                className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded py-3 font-semibold cursor-pointer mt-6"
                            >
                                {isSignIn ? "Sign In" : "Sign Up"}
                            </button>
                            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                            <p className="text-gray-400 text-sm mt-4">
                                {isSignIn ? "New to Netflix?" : "Already a user?"}{" "}
                                <span
                                    onClick={handleToggle}
                                    className="text-white hover:underline cursor-pointer"
                                >
                                    {isSignIn ? "Sign Up" : "Sign In"}
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
