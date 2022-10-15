import { useRouter } from "next/router";
import { useAuth } from "../../lib/firebase/auth";
import { useParticipant } from "../../lib/firebase/participant";
import { useState, useEffect } from "react";
import Container from "../../components/Layout/Container";
import GenericInstructions from "../../components/experiment/GenericInstructions";
import ValTask from "../../components/experiment/ValTask/ValTask";
import ValResults from "../../components/experiment/WmcTask/WmcResults";

export default function Task2() {
    const router = useRouter();
    const session = router.query.session;
    const auth = useAuth();
    const participant = useParticipant();
    const [taskStatus, setTaskStatus] = useState(0);
    const [results, setResults] = useState([]);

    useEffect(() => {
        auth.verifyAccess();
        auth.clearError();
    }, [auth.loading]);

    const beginTaskHandler = () => {
        setTaskStatus(1);
    };

    const completeTaskHandler = (results) => {
        setTaskStatus(2);
        setResults(results);
        participant.addResults(auth.user.uid, "val", session, results);
    };

    const resetPracticeHandler = () => {
        setTaskStatus(0);
    };

    return (
        <Container>
            {taskStatus === 0 ? (
                <GenericInstructions
                    session={session}
                    task={"Task 2"}
                    handleBeginTask={beginTaskHandler}
                />
            ) : taskStatus === 1 ? (
                <ValTask
                    practice={session == "practice" ? true : false}
                    onTaskComplete={completeTaskHandler}
                />
            ) : (
                <ValResults
                    session={session}
                    results={results}
                    onResetPractice={resetPracticeHandler}
                />
            )}
        </Container>
    );
}
