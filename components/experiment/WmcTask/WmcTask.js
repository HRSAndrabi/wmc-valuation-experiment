import { useState, useEffect } from "react";
import Button from "../../UI/Button";

export default function WmcTask({ practice, onTaskComplete }) {
    const [loadings, setLoadings] = useState(require("./loadings.json"));
    const [trials, setTrials] = useState([]);
    const [currentTrial, setCurrentTrial] = useState(0);
    const [trialCommenced, setTrialCommenced] = useState(false);
    const [trialPhase, setTrialPhase] = useState(0);
    const [visiblePairing, setVisiblePairing] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        let shuffledLoadings;
        if (practice) {
            const loadings = require("./loadings.json");
            shuffledLoadings = shuffle(loadings).slice(0, 2);
        } else {
            const loadings = require("./loadings.json");
            shuffledLoadings = shuffle([
                ...loadings,
                ...loadings,
                ...loadings,
                ...loadings,
            ]);
        }
        const instantiateTrials = shuffledLoadings.map((loading) => {
            const colours = shuffle(require("./colours.json"));
            const pairings = shuffle(
                colours.map((colour, i) => {
                    return {
                        number: i + 1,
                        colour: colour,
                    };
                })
            );
            return {
                ...loading,
                numCorrect: 0,
                pairings: pairings.slice(0, loading.loading),
            };
        });
        setTrials(instantiateTrials);
        console.log(instantiateTrials);
    }, []);

    const shuffle = (array) => {
        const shuffledArray = array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        return shuffledArray;
    };

    const showPairings = () => {
        for (let i = 0; i < trials[currentTrial].pairings.length; i += 0.5) {
            setTimeout(function timer() {
                if (i % 1 === 0) {
                    setVisiblePairing(trials[currentTrial].pairings[i]);
                } else {
                    setVisiblePairing(null);
                    if (i === trials[currentTrial].pairings.length - 0.5) {
                        setTrialPhase(1);
                        const shuffledTrials = [...trials];
                        shuffledTrials[currentTrial].pairings = shuffle(
                            shuffledTrials[currentTrial].pairings
                        );
                        setTrials(shuffledTrials);
                        setCurrentQuestion(
                            shuffledTrials[currentTrial].pairings[0]
                        );
                    }
                }
            }, i * 3000);
        }
    };

    const beginTrialHandler = () => {
        setTrialPhase(0);
        setTrialCommenced(true);
        showPairings();
    };

    const submitAnswerHandler = (colour, number) => {
        if (
            colour === currentQuestion.colour &&
            number === currentQuestion.number
        ) {
            trials[currentTrial].numCorrect += 1;
        } else {
        }
        const currentQuestionIndex =
            trials[currentTrial].pairings.indexOf(currentQuestion);

        if (currentQuestionIndex === trials[currentTrial].pairings.length - 1) {
            nextTrialHandler();
        } else {
            setCurrentQuestion(
                trials[currentTrial].pairings[currentQuestionIndex + 1]
            );
        }
    };

    const nextTrialHandler = () => {
        setTrialCommenced(false);
        setTrialPhase(0);
        setCurrentQuestion(null);
        const performance = trials.reduce(
            (sum, trial) => sum + trial.numCorrect,
            0
        );
        if (currentTrial == trials.length - 1) {
            onTaskComplete(trials, performance);
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
                    <div
                        className="h-52 w-52"
                        style={{ backgroundColor: visiblePairing?.colour }}
                    ></div>
                    <div className="text-9xl font-bold text-black">
                        {visiblePairing?.number}
                    </div>
                </div>
            )}
            {trialCommenced && trialPhase === 1 && (
                <div className="flex flex-col gap-10 justify-center items-center">
                    {trials[currentTrial].pairings.indexOf(currentQuestion) >
                    (trials[currentTrial].pairings.length - 1) / 2 ? (
                        <div className="flex flex-col gap-10 justify-center items-center">
                            <div className="text-2xl">
                                Select the number paired with the presented
                                colour
                            </div>
                            <div
                                className="h-52 w-52"
                                style={{
                                    backgroundColor: currentQuestion?.colour,
                                }}
                            ></div>
                            <div className="flex gap-4">
                                {shuffle(trials[currentTrial].pairings).map(
                                    (pairing, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="rounded-md border border-slate-200 p-4 flex gap-4 
                                                cursor-pointer hover:bg-slate-50 text-3xl justify-center items-center 
                                                h-16 w-16"
                                                onClick={() => {
                                                    submitAnswerHandler(
                                                        currentQuestion?.colour,
                                                        pairing.number
                                                    );
                                                }}
                                            >
                                                {pairing.number}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-10 justify-center items-center">
                            <div className="text-2xl">
                                Select the colour paired with the presented
                                number
                            </div>
                            <div className="text-9xl text-black">
                                {currentQuestion?.number}
                            </div>
                            <div className="flex gap-4">
                                {shuffle(trials[currentTrial].pairings).map(
                                    (pairing, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="rounded-md border border-slate-200 p-4 flex gap-4 
                                                cursor-pointer hover:bg-slate-50 text-3xl items-center"
                                                onClick={() => {
                                                    submitAnswerHandler(
                                                        pairing.colour,
                                                        currentQuestion?.number
                                                    );
                                                }}
                                            >
                                                <div
                                                    className="h-10 w-10"
                                                    style={{
                                                        backgroundColor:
                                                            pairing?.colour,
                                                    }}
                                                ></div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
