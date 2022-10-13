import React, { useState, useContext, createContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./client";

const participantContext = createContext();

export function ParticipantProvider({ children }) {
    const participantObj = useProvideParticipant();
    return (
        <participantContext.Provider value={participantObj}>
            {children}
        </participantContext.Provider>
    );
}

export const useParticipant = () => {
    return useContext(participantContext);
};

function useProvideParticipant() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateParticipant = (id, data) => {
        const participantRef = doc(db, "participants", id);
        setDoc(participantRef, data, { merge: true });
    };

    const getParticipant = async (id) => {
        const participantRef = doc(db, "participants", id);
        const docSnap = await getDoc(participantRef);
        if (docSnap.exists()) {
            console.log(`Participant: ${docSnap.data().uid}`);
            return docSnap.data();
        } else {
            console.log(`No participant with id: ${id}`);
            return null;
        }
    };

    return {
        loading,
        error,
        updateParticipant,
        getParticipant,
    };
}
