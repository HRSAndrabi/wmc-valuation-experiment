import { useRouter } from "next/router";
import { useAuth } from "../../lib/firebase/auth";
import { useState, useEffect } from "react";
import Container from "../../components/Layout/Container";
import Instructions from "../../components/experiment/Instructions";
import WmcTask from "../../components/experiment/WmcTask/WmcTask";
import Results from "../../components/experiment/WmcTask/Results";

export default function Task1() {
    const router = useRouter();
    const session = router.query.session;
    const auth = useAuth();
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
    };

    return (
        <Container>
            {taskStatus === 0 ? (
                <Instructions
                    session={session}
                    task={"Task 1"}
                    handleBeginTask={beginTaskHandler}
                />
            ) : taskStatus === 1 ? (
                <WmcTask
                    practice={session == "practice" ? true : false}
                    onTaskComplete={completeTaskHandler}
                />
            ) : (
                <Results session={session} results={results} />
            )}
        </Container>
    );
}