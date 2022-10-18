import { useState, useEffect } from "react";
import Button from "../../UI/Button";

export default function ValTask({ practice, onTaskComplete }) {
    const [trials, setTrials] = useState([]);
    const [currentTrial, setCurrentTrial] = useState(0);
    const [trialCommenced, setTrialCommenced] = useState(false);
    const [trialPhase, setTrialPhase] = useState(0);

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
            const { bin, prices } = generateBin(loading.sd, loading.loading);
            const { rescaledBin, rescaledPrices } = rescaleBin(bin);
            const meta = {
                ...loading,
                composition_id: i,
                samples: [],
                prices_accepted: [],
                prices_rejected: [],
            };
            instantiateTrials.push({
                ...meta,
                prices: prices,
                bin: bin,
            });
            instantiateTrials.push({
                ...meta,
                prices: rescaledPrices,
                bin: rescaledBin,
            });
        });
        console.log(instantiateTrials);
        setTrials(instantiateTrials);
    }, []);

    const generateBin = (sd, num_states) => {
        const probabilities = require("./probabilities.json");
        const mean = randomIntegerBetween(25, 75);
        let bin = [];
        const unscaledPayoffs = [];
        for (let i = 0; i < num_states; i++) {
            let payoff = randomIntegerBetweenWithoutReplacement(
                0,
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
        const prices = calclateBinPrices(bin);
        return { bin: bin, prices: prices };
    };

    const rescaleBin = (oldBin) => {
        const oldBinMean =
            oldBin.reduce((sum, element) => sum + element) / oldBin.length;
        const newBinMean = randomIntegerBetweenWithoutReplacement(25, 75, [
            oldBinMean,
        ]);
        const newBin = oldBin.map((payoff) => {
            return payoff + Math.round(oldBinMean - newBinMean);
        });
        const prices = calclateBinPrices(newBin);
        return { rescaledBin: newBin, rescaledPrices: prices };
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
