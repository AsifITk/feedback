// import React from 'react'

import { useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { db } from "../config";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function SignUp() {
    let userRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();
    let nameRef = useRef();
    let goTo = useNavigate();
    const signup = async (email, password) => {
        try {
            userRef.current = await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {

            alert(err);

        }

        console.log(userRef.current.user.uid);

        await setDoc(doc(db, "users", userRef.current.user.uid),
            {
                name: nameRef.current.value,
                email: emailRef.current.value,
                comments: {}
            });

        await updateDoc(doc(db, "alluser", 'users'),
            {
                [nameRef.current.value]: userRef.current.user.uid,
            });

        goTo(`/`);


    }

    return (
        <div className="signup-container">
            <h1>Lets Sign up</h1>
            <div className="card">

                <label htmlFor="name"></label>
                <input type="text" id="name" ref={nameRef} placeholder="Name" />
                <label htmlFor="email"></label>
                <input type="text" id="email" ref={emailRef} placeholder="Email" />
                <label htmlFor="password"></label>
                <input type="password" id="password" ref={passwordRef} placeholder="Password" />
                <button onClick={() => signup(emailRef.current.value, passwordRef.current.value)}>Sign Up</button>






            </div>










        </div>
    )
}

export default SignUp