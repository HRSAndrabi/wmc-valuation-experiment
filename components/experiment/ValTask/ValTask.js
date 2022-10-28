import { useState, useEffect } from "react";
import Button from "../../UI/Button";

export default function ValTask({ practice, onTaskComplete }) {
    const [trials, setTrials] = useState([]);
    const [currentTrial, setCurrentTrial] = useState(0);
    const [trialCommenced, setTrialCommenced] = useState(false);
    const [trialPhase, setTrialPhase] = useState(0);
    const [money, setMoney] = useState(50);
    const [sample, setSample] = useState(null);
    const [recallPriceIndex, setRecallPriceIndex] = useState(0);
    const [showPhaseTitleScreen, setPhaseTitleScreen] = useState(null);

    useEffect(() => {
        generateBin(2, 3);
        const loadings = require("./loadings.json");
        let shuffledLoadings;
        if (practice) {
            shuffledLoadings = shuffle(loadings).slice(0, 2);
        } else {
            shuffledLoadings = shuffle([...loadings, ...loadings]);
        }
        const instantiateTrials = [];
        shuffledLoadings.forEach((loading, i) => {
            const { bin, prices, payoffs } = generateBin(
                loading.sd,
                loading.loading
            );
            const colours = shuffle(
                require("./colours.json").slice(0, loading.loading)
            );
            const { rescaledBin, rescaledPrices, rescaledPayoffs } =
                rescaleBin(bin);
            const meta = {
                ...loading,
                composition_id: i,
                samples: [],
                prices_accepted: [],
                prices_rejected: [],
                colours: colours,
            };
            instantiateTrials.push({
                ...meta,
                change_type: "recomposition",
                prices: shuffle(prices),
                payoffs: payoffs,
                bin: bin,
            });
            instantiateTrials.push({
                ...meta,
                change_type: "payoffs",
                prices: shuffle(rescaledPrices),
                payoffs: rescaledPayoffs,
                bin: rescaledBin,
            });
        });
        setTrials(instantiateTrials);
    }, []);

    const generateBin = (sd, num_states) => {
        const probabilities = require("./probabilities.json");
        const mean = randomIntegerBetween(25, 75);
        let bin = [];
        const unscaledPayoffs = [];
        for (let i = 0; i < num_states; i++) {
            let payoff = randomIntegerBetweenWithoutReplacement(
                25,
                100,
                unscaledPayoffs
            );
            unscaledPayoffs.push(payoff);
            bin.push(
                ...Array(Math.round(probabilities[num_states][i] * 100)).fill(
                    payoff
                )
            );
        }
        const unscaledMean =
            bin.reduce((sum, element) => sum + element) / bin.length;
        const unscaledSd = Math.sqrt(
            bin
                .map((element) => Math.pow(element - unscaledMean, 2))
                .reduce((sum, element) => sum + element) / bin.length
        );
        bin = bin.map((element) => {
            return Math.round(
                ((element - unscaledMean) / unscaledSd) * sd + mean
            );
        });
        if (bin.some((payoff) => payoff < 0)) {
            return generateBin(sd, num_states);
        } else {
            let prices = calclateBinPrices(bin);
            let payoffs = [...new Set(bin)];
            return { bin: bin, prices: prices, payoffs: payoffs };
        }
    };

    const rescaleBin = (oldBin) => {
        const oldBinMean =
            oldBin.reduce((sum, element) => sum + element) / oldBin.length;
        const newBinMean = randomIntegerBetweenWithoutReplacement(25, 75, [
            oldBinMean,
        ]);
        let newBin = oldBin.map((payoff) => {
            return payoff + Math.round(oldBinMean - newBinMean);
        });

        if (newBin.some((payoff) => payoff < 0)) {
            return rescaleBin(oldBin);
        } else {
            let prices = calclateBinPrices(newBin);
            let payoffs = [...new Set(newBin)];
            return {
                rescaledBin: newBin,
                rescaledPrices: prices,
                rescaledPayoffs: payoffs,
            };
        }
    };

    const calclateBinPrices = (bin) => {
        const minPrice = Math.min(...bin);
        const maxPrice = Math.max(...bin);
        const prices = [
            minPrice,
            randomIntegerBetween(minPrice, maxPrice),
            randomIntegerBetween(minPrice, maxPrice),
            randomIntegerBetween(minPrice, maxPrice),
            maxPrice,
        ];
        return prices;
    };

    const randomIntegerBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomIntegerBetweenWithoutReplacement = (min, max, drawn) => {
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!drawn.includes(number)) {
            return number;
        } else {
            return randomIntegerBetween(min, max, drawn);
        }
    };

    const shuffle = (array) => {
        const shuffledArray = array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        return shuffledArray;
    };

    const randomBinDraw = () => {
        return trials[currentTrial].bin[
            (Math.random() * trials[currentTrial].bin.length) | 0
        ];
    };

    const sampleBin = () => {
        const randomDraw = randomBinDraw();
        const newTrials = [...trials];
        newTrials[currentTrial].samples = [
            ...newTrials[currentTrial].samples,
            randomDraw,
        ];
        setSample(randomDraw);
        setTrials(newTrials);
        setMoney(Math.round((money - 0.01) * 100) / 100);
        setTimeout(() => {
            setSample(null);
        }, "2000");
    };

    const beginTrialHandler = () => {
        setTrialPhase(0);
        setTrialCommenced(true);
    };

    const nextPhaseHandler = () => {
        setTrialPhase(1);
        setPhaseTitleScreen("Playing phase");
        setTimeout(() => {
            setPhaseTitleScreen(null);
        }, "2000");
    };

    const acceptPriceHandler = () => {
        const newTrials = trials;
        const price = newTrials[currentTrial].prices[recallPriceIndex];
        newTrials[currentTrial].prices_accepted = [
            ...newTrials[currentTrial].prices_accepted,
            price,
        ];
        setTrials(newTrials);
        const randomDraw = randomBinDraw();
        setMoney(Math.round((money - price + randomDraw) * 100) / 100);
        setSample(randomDraw);
        setTimeout(() => {
            setSample(null);
            if (recallPriceIndex === trials[currentTrial].prices.length - 1) {
                nextTrialHandler();
            } else {
                setRecallPriceIndex(recallPriceIndex + 1);
            }
        }, "2000");
    };

    const rejectPriceHandler = () => {
        const newTrials = trials;
        const price = newTrials[currentTrial].prices[recallPriceIndex];
        newTrials[currentTrial].prices_rejected = [
            ...newTrials[currentTrial].prices_rejected,
            price,
        ];
        setTrials(newTrials);
        if (recallPriceIndex === trials[currentTrial].prices.length - 1) {
            nextTrialHandler();
        } else {
            setRecallPriceIndex(recallPriceIndex + 1);
        }
    };

    const nextTrialHandler = () => {
        setTrialCommenced(false);
        setTrialPhase(0);
        setRecallPriceIndex(0);
        if (currentTrial == trials.length - 1) {
            onTaskComplete(trials, money);
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
                    {currentTrial > 0 &&
                    trials[currentTrial].change_type === "recomposition" ? (
                        <p>
                            <b>Compositional change</b>: an entirely new bin has
                            been created.
                        </p>
                    ) : (
                        currentTrial > 0 && (
                            <p>
                                <b>Payoff change</b>: new payoffs have been
                                assigned to each ball colour. The number of
                                balls of each colour remains the same as in the
                                previous trial.
                            </p>
                        )
                    )}
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
                <div className="flex flex-col gap-10 justify-center items-center max-w-md mx-auto">
                    {sample ? (
                        <>
                            <div className="text-xl font-bold">
                                The following payoff was drawn:
                            </div>
                            <div
                                className="rounded-full w-20 h-20 text-2xl border-2 text-black
                            border-black flex justify-center items-center font-bold"
                            >
                                {sample}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-w-xl rounded-lg font-bold p-3 bg-green-100">
                                Your balance: ${money}
                            </div>
                            {trials[currentTrial].change_type ===
                            "recomposition" ? (
                                <div>
                                    We have constructed a bin with 100 balls.
                                    The bin contains{" "}
                                    {trials[currentTrial].payoffs.length}{" "}
                                    different types of balls, indicated below.{" "}
                                    <span className="font-bold">
                                        Would you like to sample the bin at a
                                        cost of $0.01?
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    New payoffs have been assisgned to each ball
                                    in the bin. The composition of the bin is
                                    identical to that in the previous trial.{" "}
                                    <span className="font-bold">
                                        Would you like to sample the bin at a
                                        cost of $0.01?
                                    </span>
                                </div>
                            )}
                            <div
                                className="border-slate-800 my-5 rounded-xl flex 
                                justify-center items-center gap-2 flex-wrap"
                            >
                                {trials[currentTrial].payoffs.map(
                                    (payoff, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="rounded-full w-10 h-10 text-sm flex
                                                justify-center items-center text-white font-bold"
                                                style={{
                                                    backgroundColor:
                                                        trials[currentTrial]
                                                            .colours[i],
                                                }}
                                            >
                                                {payoff}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <div className="flex justify-between w-full max-w-md">
                                <Button
                                    onClick={sampleBin}
                                    variant="secondary"
                                    text="Yes"
                                />
                                <Button
                                    onClick={nextPhaseHandler}
                                    variant="secondary"
                                    text="No"
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
            {trialCommenced && trialPhase === 1 && (
                <div className="flex flex-col gap-10 justify-center items-center max-w-md mx-auto">
                    {showPhaseTitleScreen ? (
                        <div>
                            <h1>{showPhaseTitleScreen}</h1>
                            <p>You will now commence the playing phase.</p>
                        </div>
                    ) : sample ? (
                        <>
                            <div className="text-xl font-bold">
                                The following payoff was drawn:
                            </div>
                            <div
                                className="rounded-full w-20 h-20 text-2xl border-2 text-black
                            border-black flex justify-center items-center font-bold"
                            >
                                {sample}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="rounded-lg font-bold p-3 bg-green-100">
                                Your balance: ${money}
                            </div>
                            <div className="max-w-md">
                                You are now given the option to pay a price to
                                randomly draw a ball from the bin, and receive
                                the payoff.{" "}
                            </div>
                            <div className=" rounded-lg p-5 text-2xl w-full font-bold">
                                Offer price: $
                                {trials[currentTrial].prices[recallPriceIndex]}
                            </div>
                            <div className="flex justify-between w-full max-w-md">
                                <Button
                                    onClick={acceptPriceHandler}
                                    variant="secondary"
                                    text="Accept"
                                />
                                <Button
                                    onClick={rejectPriceHandler}
                                    variant="secondary"
                                    text="Reject"
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
