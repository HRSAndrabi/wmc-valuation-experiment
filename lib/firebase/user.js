import React, { useState, useEffect, useContext, createContext } from "react";
import {
    doc,
    addDoc,
    getDoc,
    getDocs,
    collection,
    Timestamp,
    onSnapshot,
    setDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./client";

const userContext = createContext();

export function UserProvider({ children }) {
    const userObj = useProvideUser();
    return (
        <userContext.Provider value={userObj}>{children}</userContext.Provider>
    );
}

export const useUser = () => {
    return useContext(userContext);
};

function useProvideUser() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const createUser = (data) => {
        const userCollectionRef = collection(db, "users");
        data.first_name =
            data.first_name.charAt(0).toUpperCase() + data.first_name.slice(1);
        data.last_name =
            data.last_name.charAt(0).toUpperCase() + data.last_name.slice(1);
        data.date_created = Timestamp.now().toDate();
        data.status = "inactive";
        addDoc(userCollectionRef, data);
    };

    const updateUser = (data) => {
        const userRef = doc(db, "users", data.id);
        setDoc(
            userRef,
            {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
            },
            { merge: true }
        );
    };

    const deleteUser = (data) => {
        const userRef = doc(db, "users", data.id);
        console.log(data.id);
        deleteDoc(userRef);
    };

    const getUser = async (id) => {
        const userRef = doc(db, "users", id);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            console.log(`User: ${docSnap.data().first_name}`);
            return docSnap.data();
        } else {
            console.log(`No user with id: ${id}`);
            return null;
        }
    };

    useEffect(() => {
        const userCollectionRef = collection(db, "users");
        const userListener = onSnapshot(userCollectionRef, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            setAllUsers(users);
        });
    }, []);

    return {
        loading,
        error,
        allUsers,
        createUser,
        updateUser,
        deleteUser,
        getUser,
    };
}
