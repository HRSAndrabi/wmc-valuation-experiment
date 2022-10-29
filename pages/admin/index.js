import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";
import { useParticipant } from "../../lib/firebase/participant";
import { useState, useEffect } from "react";

export default function Admin() {
    const [allParticipants, setAllParticipants] = useState(null);
    const participant = useParticipant();

    useEffect(() => {
        participant.getAll().then((res) => {
            setAllParticipants(res);
        });
    }, []);

    console.log(allParticipants);

    return (
        <Container>
            <div className="w-full max-w-screen-lg prose mx-auto my-auto bg-white rounded-lg px-5 py-10 overflow-x-scroll">
                <table className="table-auto text-xs">
                    <thead>
                        <tr>
                            <th className="px-2">uid</th>
                            <th className="text-right px-2">wmc_practice</th>
                            <th className="text-right px-2">val_practice</th>
                            <th className="text-right px-2">
                                wmc_task_completed
                            </th>
                            <th className="text-right px-2">
                                val_task_completed
                            </th>
                            <th className="text-right px-2">wmc_performance</th>
                            <th className="text-right px-2">val_performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allParticipants &&
                            allParticipants.map((participant, i) => {
                                const wmc_practice_length =
                                    participant.data.results.filter(
                                        (result) => {
                                            return (
                                                result.session === "practice" &&
                                                result.task === "wmc"
                                            );
                                        }
                                    ).length;

                                const val_practice_length =
                                    participant.data.results.filter(
                                        (result) => {
                                            return (
                                                result.session === "practice" &&
                                                result.task === "val"
                                            );
                                        }
                                    ).length;

                                return (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50 cursor-pointer"
                                    >
                                        <td className="px-2">
                                            {participant.id}
                                        </td>
                                        <td className="text-right px-2">
                                            {wmc_practice_length > 0
                                                ? wmc_practice_length
                                                : "-"}
                                        </td>
                                        <td className="text-right px-2">
                                            {val_practice_length > 0
                                                ? val_practice_length
                                                : "-"}
                                        </td>
                                        <td className="text-right px-2">
                                            {participant.data
                                                .wmc_task_completed ? (
                                                <span className="bg-green-500 rounded-full text-white font-medium py-1 px-2 text-xs">
                                                    true
                                                </span>
                                            ) : (
                                                <span className="bg-slate-100 rounded-full text-slate-400 font-medium py-1 px-2  text-xs">
                                                    false
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-right px-2">
                                            {participant.data
                                                .val_task_completed ? (
                                                <span className="bg-green-500 rounded-full text-white font-medium py-1 px-2 text-xs">
                                                    true
                                                </span>
                                            ) : (
                                                <span className="bg-slate-100 rounded-full text-slate-400 font-medium py-1 px-2 text-xs">
                                                    false
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-right px-2">
                                            {!participant.data
                                                .wmc_task_completed && "-"}
                                            {participant.data.results
                                                .filter((result) => {
                                                    return (
                                                        result.session ===
                                                            "formal" &&
                                                        result.task === "wmc"
                                                    );
                                                })
                                                .map((result) => {
                                                    return result.performance;
                                                })}
                                        </td>
                                        <td className="text-right px-2">
                                            {!participant.data
                                                .val_task_completed && "-"}
                                            {participant.data.results
                                                .filter((result) => {
                                                    return (
                                                        result.session ===
                                                            "formal" &&
                                                        result.task === "val"
                                                    );
                                                })
                                                .map((result) => {
                                                    return result.performance;
                                                })}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}

Admin.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
