import { useState, useEffect } from "react";
import Button from "../../UI/Button";

export default function ValTask({ practice, onTaskComplete }) {
    const [trials, setTrials] = useState([]);
    const [currentTrial, setCurrentTrial] = useState(0);
    const [trialCommenced, setTrialCommenced] = useState(false);
    const [trialPhase, setTrialPhase] = useState(0);

    useEffect(() => {
        console.log("Instantiate.");
    }, []);

    const shuffle = (array) => {
        const shuffledArray = array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        return shuffledArray;
    };

    const beginTrialHandler = () => {
        setTrialPhase(0);
        setTrialCommenced(true);
        console.log(trials);
    };

    const submitAnswerHandler = () => {
        console.log("Submit answer");
    };

    const nextTrialHandler = () => {
        setTrialCommenced(false);
        setTrialPhase(0);
        if (currentTrial == trials.length - 1) {
            onTaskComplete(trials);
        } else {
            setCurrentTrial(currentTrial + 1);
        }
    };

    return (
        <div className="w-full max-w-prose prose mx-auto my-auto text-center">
            {!trialCommenced && (
                <div>
                    <h1>
                        Trial {currentTrial + 1} out of {trials.length}
                    </h1>
                    <div className="flex justify-center mt-10">
                        <Button
                            onClick={beginTrialHandler}
                            variant="secondary"
                            arrow="forward"
                            text="Begin trial"
                        />
                    </div>
                </div>
            )}
            {trialCommenced && trialPhase === 0 && (
                <div className="flex flex-col gap-10 justify-center items-center">
                    <div>Sampling phase</div>
                </div>
            )}
            {trialCommenced && trialPhase === 1 && (
                <div className="flex flex-col gap-10 justify-center items-center">
                    <div>Recall phase</div>
                </div>
            )}
        </div>
    );
}
