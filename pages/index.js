import { useState, useEffect } from "react";
import { useAuth } from "../lib/firebase/auth";
import { useParticipant } from "../lib/firebase/participant";
import Layout from "../components/Layout/Layout";
import Container from "../components/Layout/Container";
import Welcome from "../components/experiment/Welcome";
import Overview from "../components/experiment/Overview";
import WmcInstructions from "../components/experiment/WmcTask/WmcInstructions";
import WmcLaunch from "../components/experiment/WmcTask/WmcLaunch";
import ValInstructions from "../components/experiment/ValTask/ValInstructions";
import ValLaunch from "../components/experiment/ValTask/ValLaunch";
import Button from "../components/UI/Button";
import { MdPlayCircle } from "react-icons/md";

export default function Home() {
    const auth = useAuth();
    const participant = useParticipant();
    const [selectedStep, setSelectedStep] = useState(0);
    const [currentParticipant, setCurrentParticipant] = useState(null);

    useEffect(() => {
        const fetchParticipant = async () => {
            if (auth.user) {
                const currentParticipant = await participant.get(auth.user.uid);
                setCurrentParticipant(currentParticipant);
            }
        };
        fetchParticipant();
        console.log(currentParticipant);
    }, [auth.user]);

    const steps = [
        {
            name: "Welcome",
            content: <Welcome />,
        },
        {
            name: "Overview",
            content: <Overview />,
        },
        {
            name: "Task 1 instructions",
            content: <WmcInstructions />,
        },
        {
            name: <MdPlayCircle className="text-lg" />,
            content: <WmcLaunch />,
        },
        {
            name: "Task 2 instructions",
            content: <ValInstructions />,
        },
        {
            name: <MdPlayCircle className="text-lg" />,
            content: <ValLaunch />,
        },
    ];

    return (
        <Container>
            <div className="bg-white rounded-lg px-5 py-10 min-h-[39rem] flex flex-col justify-between max-w-screen-md mx-auto">
                <div>
                    <div className="flex gap-6 text-xs font-bold mx-auto mb-10 relative w-max">
                        <div className="absolute top-1/2 left-0 right-0 border border-blue-200"></div>
                        {steps.map((step, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setSelectedStep(i);
                                    }}
                                    className={`border-2 rounded-full px-2 py-1 cursor-pointer z-10
								${
                                    selectedStep === i
                                        ? "text-white bg-blue-600 border-blue-600"
                                        : "text-blue-300 bg-blue-50 border-blue-200 hover:bg-blue-100"
                                }`}
                                >
                                    {step.name}
                                </div>
                            );
                        })}
                    </div>
                    <div className="max-w-prose prose mx-auto">
                        <div className="mb-10">
                            {steps[selectedStep].content}
                        </div>
                    </div>
                </div>
                <div className="max-w-prose w-full mx-auto">
                    <div className="flex justify-between">
                        <Button
                            onClick={() => {
                                setSelectedStep(selectedStep - 1);
                            }}
                            variant="primary"
                            arrow="backward"
                            text="Previous"
                            size="extra-small"
                            disabled={selectedStep === 0}
                        />
                        <Button
                            onClick={() => {
                                setSelectedStep(selectedStep + 1);
                            }}
                            variant="primary"
                            arrow="forward"
                            text="Next"
                            size="extra-small"
                            disabled={selectedStep === steps.length - 1}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

Home.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
