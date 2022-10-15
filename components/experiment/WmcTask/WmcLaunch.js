import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/firebase/auth";
import { useParticipant } from "../../../lib/firebase/participant";
import Button from "../../UI/Button";

export default function WmcLaunch() {
    const auth = useAuth();
    const participant = useParticipant();
    const [currentParticipant, setCurrentParticipant] = useState(null);

    useEffect(() => {
        const fetchParticipant = async () => {
            if (auth.user) {
                const currentParticipant = await participant.get(auth.user.uid);
                setCurrentParticipant(currentParticipant);
            }
        };
        fetchParticipant();
    }, [auth.user]);

    return (
        <div>
            <h2>Launch task 1</h2>
            <p>
                Use the interface below to launch a practice session, and then
                commence the task. You may complete as many practice sessions as
                you like.
            </p>
            <div className="flex flex-col gap-2">
                <div className="rounded-lg border boder-slate-100 p-5 flex flex-col gap-2">
                    <div className="text-slate-700 font-semibold">
                        Task 1: Working memory capacity (~30 minutes)
                    </div>
                    <div className="text-slate-500 text-sm flex flex-col gap-1 mb-5">
                        <div className="mb-5">
                            {!currentParticipant?.wmc_task_completed
                                ? "You must complete at least one practice session before beginning the task."
                                : "This task has already been completed."}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                Router.push({
                                    pathname: "/task-1",
                                    query: { session: "practice" },
                                });
                            }}
                            variant="alt"
                            arrow="forward"
                            text="Launch practice"
                            size="extra-small"
                            disabled={currentParticipant?.wmc_task_completed}
                        />
                        <Button
                            onClick={() => {
                                Router.push({
                                    pathname: "/task-1",
                                    query: { session: "formal" },
                                });
                            }}
                            variant="primary"
                            arrow="forward"
                            text="Begin task"
                            size="extra-small"
                            disabled={
                                !currentParticipant?.wmc_practice_completed |
                                currentParticipant?.wmc_task_completed
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
