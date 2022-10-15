import Button from "../../UI/Button";
import Router from "next/router";

export default function WmcResults({ session, results, onResetPractice }) {
    const totalCorrect = results.reduce(
        (sum, trial) => sum + trial.numCorrect,
        0
    );
    const totalQuestions = results.reduce(
        (sum, trial) => sum + trial.loading,
        0
    );

    return (
        <div className="w-full max-w-prose prose mx-auto my-auto">
            <h2>You have completed task 1</h2>
            {session === "practice" && (
                <div className="rounded-lg bg-slate-100 p-5 border border-slate-300 text-sm">
                    <b>Note</b>: This was a practice run. Please return to the
                    dashboard to formally complete the task.
                </div>
            )}
            <h3>Results</h3>
            <p>
                You scored{" "}
                <span className="font-semibold">
                    {totalCorrect} out of {totalQuestions} (
                    {Math.round((totalCorrect * 10000) / totalQuestions) / 100}
                    %)
                </span>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Trial number</th>
                        <th>Loading</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((trial, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{trial.loading}</td>
                                <td>
                                    {trial.numCorrect}/{trial.loading}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-between">
                <Button
                    onClick={() => {
                        onResetPractice();
                    }}
                    variant="alt"
                    arrow="forward"
                    text="Launch another practice run"
                    size="small"
                />
                <Button
                    onClick={() => {
                        Router.push({
                            pathname: "/",
                        });
                    }}
                    variant="primary"
                    arrow="forward"
                    text="Return to dashboard"
                    size="small"
                />
            </div>
        </div>
    );
}
