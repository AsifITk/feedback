// import React from 'react'

import { useNavigate, useParams } from "react-router-dom";
import { deleteField, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

function Profile() {
    let params = useParams();
    let [userDetails, setUserDetails] = useState();
    let [userComments, setComments] = useState();
    let goTo = useNavigate();


    let getUser = async () => {
        let user = await getDoc(doc(db, "users", `${params.id}`));
        setUserDetails(() => user.data());
        console.log(user.data());
    };
    let getComments = async () => {
        let allComments = await getDoc(doc(db, "comments", `${params.id}`));
        setComments(() => allComments.data());
        console.log(userComments);
    };
    let removeComments = async (field) => {
        const commentsRef = doc(db, "comments", `${params.id}`);

        // Remove the 'capital' field from the document
        await updateDoc(commentsRef, {
            [field]: deleteField(),
        });
        window.location.reload(false);
    };

    useEffect(() => {
        getUser();
        getComments();

        console.log(userComments);
    }, []);

    return (
        <div className="profile-container">
            {userDetails && userComments ? (
                <div className="profile-card">
                    <div className="user-name"> {userDetails.name}</div>
                    <div className="user-email"> {userDetails.email}</div>

                    <div className="comment-card">
                        {Object.keys(userComments).map((key) => {
                            return (
                                <div key={key}>
                                    <div>{userComments[key]}</div>
                                    <div>{`${new Date(key * 1)}`}</div>
                                    <button
                                        onClick={(e) => {
                                            removeComments(key);


                                        }}
                                    >
                                        Delete
                                    </button>{" "}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div>Loading... <button onClick={() => goTo(`/${params.id}`)}>Get Comment link</button></div>
            )}
        </div>
    );
}

export default Profile;
// const miliseconds = 1604395966369;

// const date = new Date(miliseconds);
