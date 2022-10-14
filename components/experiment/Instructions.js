import { MdArrowForward } from "react-icons/md";
import Button from "../UI/Button";
import Router from "next/router";

export default function Instructions({ session, task, handleBeginTask }) {
    return (
        <div className="w-full max-w-prose prose mx-auto my-auto">
            <h2>You are about to begin {task}.</h2>
            {session === "practice" ? (
                <div className="rounded-lg bg-slate-100 p-5 border border-slate-300 text-sm">
                    <b>Note</b>: This is a practice run. You should use this run
                    to try and familiarse yourself with the structure and
                    interface of the task.
                </div>
            ) : (
                <div className="rounded-lg bg-slate-100 p-5 border border-slate-300 text-sm">
                    <b>Note</b>: This is your one and only formal attempt for{" "}
                    {task}. If you are unsure about structure of the task or the
                    interface, please return to the dashboard now and complete
                    another practice run.
                </div>
            )}
            <p>
                Before proceeding, please take some time to set up in a quiet
                place where you are unlikely to be disturbed. If you haven't
                already, please turn off your cellphone and put it away.
            </p>
            <p>
                Please do not take notes, or use assistive technologies like
                calculators or cellphones during the task.
            </p>
            <p>
                If you wish to review the instructions once more, you may return
                to the dashboard. If you are ready to commence the task, please
                click 'Begin task'.
            </p>
            <p>
                Upon commencing the task,{" "}
                <b>
                    do not close or refresh your browser until the task has been
                    completed.
                </b>
            </p>
            <div className="flex gap-2 justify-between mt-10">
                <Button
                    onClick={() => {
                        Router.push("/");
                    }}
                    variant="alt"
                    arrow="forward"
                    text="Return to dashboard"
                    size="small"
                />
                <Button
                    onClick={handleBeginTask}
                    variant="primary"
                    arrow="forward"
                    text="Begin task"
                    size="small"
                />
            </div>
        </div>
    );
}
