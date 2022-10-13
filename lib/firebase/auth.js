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
import { auth } from "./client";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            setUser(user);

            cookie.set("cbmmvlab-auth", true, {
                expires: 1,
            });

            setLoading(false);
            setError(null);
            return user;
        } else {
            setUser(false);
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
                setError("Invalid email or password.");
                return;
            case "auth/invalid-password":
                setError("Invalid email or password.");
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
            Router.push("/");
            return;
        }
        auth.currentUser
            .getIdTokenResult()
            .then((idTokenResult) => {
                // console.log(idTokenResult);
                if (!!idTokenResult.claims.admin) {
                    return;
                } else {
                    Router.push("/dashboard");
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
                    auth.currentUser
                        .getIdTokenResult()
                        .then((idTokenResult) => {
                            console.log(idTokenResult);
                            if (!!idTokenResult.claims.admin) {
                                Router.push("/admin/experiments");
                            } else {
                                Router.push("/dashboard");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
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
                Router.push("/");
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
        token,
    };
};
