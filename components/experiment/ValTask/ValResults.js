import Button from "../../UI/Button";
import Router from "next/router";

export default function ValResults({
    session,
    results,
    performance,
    onResetPractice,
}) {
    console.log(results);
    console.log(performance);

    return (
        <div className="w-full max-w-prose prose mx-auto my-auto">
            <h2>You have completed task 2</h2>
            {session === "practice" && (
                <div className="rounded-lg bg-slate-100 p-5 border border-slate-300 text-sm">
                    <b>Note</b>: This was a practice run. Please return to the
                    dashboard to formally complete the task.
                </div>
            )}
            <h3>Results</h3>
            <p>
                Your performance:{" "}
                <span className="font-semibold">
                    ${performance} (+{performance - 50})
                </span>
            </p>
            <table className="text-xs">
                <thead>
                    <tr>
                        <th>Trial</th>
                        <th>Loading</th>
                        <th>Sample length</th>
                        <th>Min payoff</th>
                        <th>Max payoff</th>
                        <th>Average payoff</th>
                        <th>Accepted prices</th>
                        <th>Rejected prices</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((trial, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{trial.loading}</td>
                                <td>{trial.samples.length}</td>
                                <td>{Math.min(...trial.payoffs)}</td>
                                <td>{Math.max(...trial.payoffs)}</td>
                                <td>
                                    {trial.bin.reduce((a, b) => a + b, 0) /
                                        trial.bin.length}
                                </td>
                                <td>{trial.prices_accepted.join(", ")}</td>
                                <td>{trial.prices_rejected.join(", ")}</td>
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
