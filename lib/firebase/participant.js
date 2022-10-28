import React, { useState, useContext, createContext } from "react";
import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    arrayUnion,
    Timestamp,
    collection,
} from "firebase/firestore";
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
    const update = (id, data) => {
        const participantRef = doc(db, "participants", id);
        setDoc(participantRef, data, { merge: true });
    };

    const addResults = (id, task, session, results, performance) => {
        const participantRef = doc(db, "participants", id);
        updateDoc(participantRef, {
            results: arrayUnion({
                session: session,
                task: task,
                time_completed: Timestamp.now().toDate(),
                performance: performance,
                results: [...results],
            }),
        });
        if (session === "practice" && task === "wmc") {
            update(id, { wmc_practice_completed: true });
        } else if (session === "formal" && task === "wmc") {
            update(id, { wmc_task_completed: true });
        } else if (session === "practice" && task === "val") {
            update(id, { val_practice_completed: true });
        } else if (session === "formal" && task === "val") {
            update(id, { val_task_completed: true });
        }
    };

    const get = async (id) => {
        const participantRef = doc(db, "participants", id);
        const docSnap = await getDoc(participantRef);
        if (docSnap.exists()) {
            console.log(`Participant: ${id}`);
            return docSnap.data();
        } else {
            console.log(`No participant with id: ${id}`);
            return null;
        }
    };

    const getAll = async () => {
        const participantsSnapshot = await getDocs(
            collection(db, "participants")
        );
        const participants = [];
        participantsSnapshot.forEach((doc) => {
            participants.push({ id: doc.id, data: doc.data() });
        });
        return participants;
    };

    return {
        get,
        getAll,
        update,
        addResults,
    };
}
