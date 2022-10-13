import { useAuth } from "../lib/firebase/auth";
import Layout from "../components/Layout/Layout";
import Container from "../components/Layout/Container";
import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function Home() {
    const auth = useAuth();
    const [selectedStep, setSelectedStep] = useState(0);

    const steps = [
        {
            name: "1. Welcome",
            content: (
                <>
                    <h2>Welcome</h2>
                    <p>
                        Welcome to your remote experiment. During the experiment
                        you are not allowed to communicate. If you have
                        questions at any time, please notify your experimenter.
                    </p>
                    <p>
                        You should complete this experiment in a quiet
                        environment without distractions.
                    </p>
                    <p>
                        You will make your decisions privately and anonymously.
                        Your name will never be linked to your decisions or
                        performance.
                    </p>
                    <p>
                        During the experiment you are not allowed to take notes,
                        or use assistive techonologies like calculators or
                        cellphones.
                    </p>
                    <p>
                        After commencing a task,{" "}
                        <b>
                            do not close your browser until the task has been
                            completed.
                        </b>
                    </p>
                </>
            ),
        },
        {
            name: "2. Overview",
            content: (
                <>
                    <h2>Overview</h2>
                    <p>
                        You will be asked to complete two tasks in this
                        experiment.
                    </p>
                    <p>
                        The first task is an assessment of working memory
                        capacity. In this task, you will be asked to recall a
                        series of number and colour pairs. Your performance will
                        depend on the number of pairs you can accurately recall.
                    </p>
                    <p>
                        The second task is a valuation game. In this task, you
                        will be offered a price to enter into a gamble with
                        uncertain payoffs. Your performance will depend on your
                        ability to identify and accept cheap offers, and reject
                        expensive offers.
                    </p>
                    <p>
                        This experiment will take roughly one hour to complete.
                    </p>
                </>
            ),
        },
        {
            name: "3. Task 1",
            content: (
                <>
                    <h2>Task 1: Working memory capacity</h2>
                    <p>
                        This task assesses the accuracy with which you can
                        recall short lists of exclusive number-colour pairings.
                        Each trial within this task consists of two phases: the{" "}
                        <b>binding phase</b>, and the <b>recall phase</b>. You
                        will complete 24 trials of this task in total.
                    </p>
                    <h3>Binding phase</h3>
                    <p>
                        During the binding phase, you will be successively
                        presented with a series of number-colour pairings.{" "}
                        <b>
                            Your task is to remember these pairings as best you
                            can.
                        </b>{" "}
                    </p>
                    <p>
                        We will vary the difficulty of trials by increasing or
                        decreasing the number of presented pairings.
                    </p>
                    <div className="text-xs font-light pb-1">
                        Binding phase: example presentation of number-colour
                        pairing
                    </div>
                    <div
                        className="flex gap-5 justify-center p-5 border border-slate-200
						rounded-lg"
                    >
                        <div className="flex flex-col gap-2 items-center justify-center min-h-[5rem]">
                            <div className="w-5 h-5 bg-red-600"></div>
                            <div>5</div>
                        </div>
                    </div>
                    <h3>Recall phase</h3>
                    <p>
                        After all pairings in a given trial have been presented,
                        you will begin the recall phase. You will be
                        successively presented with a series of multiple-choice
                        tests that probe your recollection of the observed
                        pairings.{" "}
                        <b>
                            Your task is to recall the previously observed
                            pairings as best you can.
                        </b>{" "}
                    </p>
                    <div className="text-xs font-light pb-1">
                        Recall phase: example multiple-choice question
                    </div>
                    <div
                        className="flex flex-col gap-5 items-center border border-slate-200 
						rounded-lg p-5 justify-center min-h-[5rem] text-xs"
                    >
                        <div className="font-light italic">
                            Select the number paired with the colour shown
                            below:
                        </div>
                        <div className="w-5 h-5 bg-red-600"></div>
                        <div className="flex gap-4">
                            <label
                                for="option-1"
                                className="rounded-md border border-slate-200 px-4 py-1 flex gap-2 
								cursor-pointer hover:bg-slate-50"
                            >
                                <input
                                    id="option-1"
                                    type="radio"
                                    value="1"
                                    name="example-question"
                                    className="cursor-pointer"
                                />
                                1
                            </label>
                            <label
                                for="option-2"
                                className="rounded-md border border-slate-200 px-4 py-1 flex gap-2 
								cursor-pointer hover:bg-slate-50"
                            >
                                <input
                                    id="option-2"
                                    type="radio"
                                    value="5"
                                    name="example-question"
                                    className="cursor-pointer"
                                    defaultChecked
                                />
                                5
                            </label>
                            <label
                                for="option-3"
                                className="rounded-md border border-slate-200 px-4 py-1 flex gap-2 
								cursor-pointer hover:bg-slate-50"
                            >
                                <input
                                    id="option-3"
                                    type="radio"
                                    value="9"
                                    name="example-question"
                                    className="cursor-pointer"
                                />
                                9
                            </label>
                        </div>
                    </div>
                    <h3>Performance</h3>
                    <p>
                        Your performance will depend on the number of pairs you
                        can accurately recall. Your payment for this task will
                        be calculated as your average accuracy across all trials
                        multiplied by $20.
                    </p>
                </>
            ),
        },
        {
            name: "4. Task 2",
            content: (
                <>
                    <h2>Task 2: Valuation game</h2>
                </>
            ),
        },
        {
            name: "5. Practice",
            content: (
                <>
                    <h2>Practice</h2>
                </>
            ),
        },
        {
            name: "6. Begin experiment",
            content: (
                <>
                    <h2>Begin experiment</h2>
                </>
            ),
        },
    ];

    return (
        <Container>
            <div className="bg-white rounded-lg px-5 py-10 min-h-[39rem] flex flex-col justify-between">
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
                        <button
                            disabled={selectedStep === 0}
                            onClick={() => {
                                setSelectedStep(selectedStep - 1);
                            }}
                            className="text-white text-sm bg-blue-600 hover:bg-blue-700 px-3 
							py-2 rounded-lg flex gap-2 items-center disabled:bg-slate-200 disabled:text-white"
                        >
                            <MdArrowBack />
                            Previous
                        </button>
                        <button
                            disabled={selectedStep === steps.length - 1}
                            onClick={() => {
                                setSelectedStep(selectedStep + 1);
                            }}
                            className="text-white text-sm bg-blue-600 hover:bg-blue-700 px-3 
							py-2 rounded-lg flex gap-2 items-center disabled:bg-slate-200 disabled:text-white"
                        >
                            Next
                            <MdArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

Home.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
