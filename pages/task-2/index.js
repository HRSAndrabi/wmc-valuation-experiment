import { useRouter } from "next/router";
import { useAuth } from "../../lib/firebase/auth";
import { useParticipant } from "../../lib/firebase/participant";
import { useState, useEffect } from "react";
import Container from "../../components/Layout/Container";
import GenericInstructions from "../../components/experiment/GenericInstructions";
import ValTask from "../../components/experiment/ValTask/ValTask";
import ValResults from "../../components/experiment/ValTask/ValResults";

export default function Task2() {
    const router = useRouter();
    const session = router.query.session;
    const auth = useAuth();
    const participant = useParticipant();
    const [taskStatus, setTaskStatus] = useState(0);
    const [results, setResults] = useState([]);
    const [performance, setPerformance] = useState(0);

    useEffect(() => {
        auth.verifyAccess();
        auth.clearError();
    }, [auth.loading]);

    const beginTaskHandler = () => {
        setTaskStatus(1);
    };

    const completeTaskHandler = (results, performance) => {
        setTaskStatus(2);
        setResults(results);
        setPerformance(performance);
        participant.addResults(
            auth.user.uid,
            "val",
            session,
            results,
            performance
        );
    };

    const resetPracticeHandler = () => {
        setTaskStatus(0);
    };

    return (
        <div className="min-h-screen flex items-center">
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
                        performance={performance}
                        onResetPractice={resetPracticeHandler}
                    />
                )}
            </Container>
        </div>
    );
}
