// import React from 'react'

import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { useEffect } from "react";

function FeedBack() {
    let comment = useRef();
    let params = useParams();
    let [allUsers, setAllUsers] = useState();
    console.log(params);

    let getData = async () => {
        const docRef = doc(db, "alluser", `users`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setAllUsers(docSnap.data());

            console.log(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        console.log(params.id);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="feedback-container">
            <h1>Whats in your mind?🤗</h1>
            {allUsers ? (
                <div className="feedback-card">
                    {" "}
                    <textarea name="" id="" cols="30" rows="10" ref={comment}></textarea>
                    <button
                        onClick={async () => {
                            try {
                                console.log("comment added")
                                console.log(allUsers, params.id)
                                await setDoc(doc(db, "comments", `${allUsers[params.id]}`), {

                                    [Date.now()]: comment.current.value,

                                }, { merge: true });
                            } catch (err) {
                                console.log(err);
                            }

                            // await updateDoc(doc(db, "users", `${allUsers[params.id]}`), {
                            //     'comments': {
                            //         [Date.now()]: comment.current.value,
                            //     }
                            // });


                        }}
                    >Leave a Comment </button>
                </div>
            ) : (
                "Loading"
            )}
        </div>
    );
}

export default FeedBack;
