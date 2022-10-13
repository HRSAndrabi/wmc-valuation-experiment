import Router from "next/router";
import React, { useState, useEffect, useContext, createContext } from "react";
import cookie from "js-cookie";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "./client";
import { db } from "./client";

const authContext = createContext();

export function AuthProvider({ children }) {
    const authObj = useProvideAuth();
    return (
        <authContext.Provider value={authObj}>{children}</authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            setUser(user);
            const participantSnapshot = await getDoc(
                doc(db, "participants", user.uid)
            );
            const participant = participantSnapshot.data();
            setParticipant(participant);

            cookie.set("cbmmvlab-auth", true, {
                expires: 1,
            });

            setLoading(false);
            setError(null);
            return user;
        } else {
            setUser(null);
            setParticipant(null);
            cookie.remove("cbmmvlab-auth");
            setLoading(false);
            return false;
        }
    };

    const handleError = (error) => {
        switch (error) {
            case "auth/email-already-exists":
                setError("The provided email is already in use.");
                return;
            case "auth/email-already-in-use":
                setError("The provided email is already in use.");
                return;
            case "auth/credential-already-in-use":
                setError(
                    "The provided account is already linked to another user."
                );
                return;
            case "auth/account-exists-with-different-credential":
                setError("The provided email is already in use.");
                return;
            case "auth/user-not-found":
                setError("User not found.");
                return;
            case "auth/invalid-password":
                setError("Invalid password.");
                return;
            case "auth/wrong-password":
                setError("Invalid password.");
                return;
            default:
                setError(error);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const verifyAccess = () => {
        if (loading) {
            return;
        }
        if (!user) {
            Router.push("/login");
            return;
        }
    };

    const verifyAdmin = () => {
        if (auth.currentUser) {
            return auth.currentUser.getIdTokenResult();
        }
    };

    const signinWithEmail = (email, password, rememberMe) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                handleUser(response.user).then(() => {
                    setPersistence(
                        auth,
                        rememberMe
                            ? browserLocalPersistence
                            : browserSessionPersistence
                    );
                    Router.push("/");
                });
            })
            .catch((error) => {
                handleError(error.code);
                setLoading(false);
            });
    };

    const signout = () => {
        signOut(auth)
            .then(() => {
                handleUser(false);
                Router.push("/login");
            })
            .catch((error) => {
                handleError(error.code);
                console.log(error.code);
                setLoading(false);
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                handleUser(user);
            } else {
                handleUser(false);
            }
        });
    }, []);

    return {
        user,
        participant,
        loading,
        error,
        clearError,
        signinWithEmail,
        signout,
        verifyAccess,
        verifyAdmin,
    };
}

const formatUser = async (user) => {
    const token = await user.getIdToken();
    return {
        uid: user.uid,
        email: user.email,
        username: user.email.substring(0, user.email.indexOf("@")),
        token,
    };
};
