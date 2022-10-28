import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";
import { useParticipant } from "../../lib/firebase/participant";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";

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
            <div className="w-full max-w-screen-lg prose mx-auto my-auto bg-white rounded-lg px-5 py-10">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>uid</th>
                            <th className="text-right">wmc_task_completed</th>
                            <th className="text-right">val_task_completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allParticipants &&
                            allParticipants.map((participant, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50 cursor-pointer"
                                    >
                                        <td>{participant.id}</td>
                                        <td className="text-right">
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
                                        <td className="text-right">
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
