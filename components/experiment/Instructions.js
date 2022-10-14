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
                    <b>Note</b>: This is not a practice run. If you are unsure
                    about structure of the task or the interface, please return
                    to the dashboard now and complete another practice run.
                </div>
            )}
            <p>
                Please ensure you are in a quiet environment, that is free of
                distractions. If you haven't already, please turn off your
                cellphone and put it away.
            </p>
            <p>
                Please do not take notes, or use assistive technologies like
                calculators or cellphones during the task.
            </p>
            <p>
                Once you have commenced the task, do not close your browser or
                the current tab until the task is completed.
            </p>
            <p className="mb-10">
                If you wish to review the instructions once more, you may return
                to the dashboard. If you are ready to commence the task, please
                click 'Begin task'.
            </p>
            <div className="flex gap-2 justify-between">
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
