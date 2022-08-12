// import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
function SignIn({ setUser }) {
    let emailRef = useRef();
    let passwordRef = useRef();
    let userid = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const goTo = useNavigate();
    let userCredential = useRef()

    const signin = async (email, password) => {
        try {

            userCredential.current = await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            alert(err)
        }
        userid.current = userCredential.current.user.uid;
        setUser(() => userid.current);
        goTo(`/profile/${userid.current}`);

    }
    return (
        <div className="signin-container">
            <h1>Hop on....!</h1>

            <div className="card">

                <label htmlFor="email">Email</label>
                <input ref={emailRef} type="text" />
                <label htmlFor="password">PassWord</label>
                <input ref={passwordRef} type="password" />

                <button onClick={() => signin(emailRef.current.value, passwordRef.current.value)}>Sign in</button>





            </div>














        </div>
    )
}

export default SignIn