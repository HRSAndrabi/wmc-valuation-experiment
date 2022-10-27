import React from "react";
import Button from "../../UI/Button";

export default function ValInstructions() {
    return (
        <div>
            <h2>Task 2: Valuation game</h2>
            <p>
                This task assesses your ability to identify cheap prices to
                enter into a risky gamble. You will complete 48 trials of this
                task. Each trial within this task consists of two phases: the{" "}
                <b>sampling phase</b>, and the <b>playing phase</b>.
            </p>
            <h3>Sampling phase</h3>
            <p>
                During the sampling period, you will be presented with a virtual
                bin containing a number of coloured balls. Each ball is
                associated with a payoff indicated by the number on the ball.
                Payoffs are the same for balls of the same colour. You will be
                told the number of colours inside the bin, and the payoffs
                corresponding to each colour.{" "}
                <b>
                    You will not be told the number of balls of each colour
                    inside the bin.
                </b>
            </p>
            <p>
                After you have been informed of the number of colours inside the
                bin and their corresponding payoffs, you will be asked if you
                wish to sample the bin. If you choose to sample, a ball will be
                drawn from the bin and the associated payoff will be revealed.
                You may sample the bin as much as you like, at a small penalty
                of $0.01. You should use the sampling mechanism to develop a
                valuation of the bin.
            </p>
            <div className="text-xs font-light pb-1">
                Sampling phase: example bin presentation during sampling period
            </div>
            <div
                className="flex flex-col gap-2 justify-center p-5 border border-slate-200
			    rounded-lg text-xs text-slate-600 font-light text-center"
            >
                <div className="rounded-lg font-bold p-3 bg-green-100 max-w-xs mx-auto">
                    Your balance: $50
                </div>
                <p className="max-w-xs mx-auto">
                    We have constructed a bin with 100 balls. The bin contains 6
                    different types of balls, indicated below.{" "}
                    <span className="font-bold">
                        Would you like to sample the bin at a cost of $0.01?
                    </span>
                </p>
                <div className="flex gap-2 items-center justify-center mt-3 mb-8">
                    <div
                        className="w-7 h-7 rounded-full bg-[#920000] flex items-center 
                            text-white justify-center font-bold text-xs"
                    >
                        12
                    </div>
                    <div
                        className="w-7 h-7 rounded-full bg-[#490092] flex items-center 
                            text-white justify-center font-bold text-xs"
                    >
                        32
                    </div>
                    <div
                        className="w-7 h-7 rounded-full bg-[#006ddb] flex items-center 
                            text-white justify-center font-bold text-xs"
                    >
                        37
                    </div>
                    <div
                        className="w-7 h-7 rounded-full bg-[#ff6db6] flex items-center 
                            text-white justify-center font-bold text-xs"
                    >
                        34
                    </div>
                    <div
                        className="w-7 h-7 rounded-full bg-[#22cf22] flex items-center 
                            text-white justify-center font-bold text-xs"
                    >
                        29
                    </div>
                    <div
                        className="w-7 h-7 rounded-full bg-[#ffdf4d] flex items-center 
                            text-white justify-center font-bold text-xs"
                    >
                        59
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <Button variant="alt" text="Yes" size="extra-small" />
                    <Button variant="alt" text="No" size="extra-small" />
                </div>
            </div>
            <h3>Playing phase</h3>
            <p>
                The playing period commences when you no longer wish to continue
                sampling. During the playing period, you will be offered a price
                to <i>buy in</i> to the gamble: a price will be quoted, and you
                can choose to pay the price to enter into the gamble or reject
                the offer.
            </p>
            <p>
                If the gamble is entered, a ball is drawn from the bin and you
                receive the payoff associated with that ball. If you reject the
                gamble, the play-money is kept level and the trial continues.
                This process will be repeated five times with different prices.
            </p>
            <div className="text-xs font-light pb-1">
                Playing phase: example price presentation during playing phase
            </div>
            <div
                className="flex flex-col gap-2 justify-center p-5 border border-slate-200
			    rounded-lg text-xs text-slate-600 font-light text-center"
            >
                <div className="rounded-lg font-bold p-3 bg-green-100 max-w-xs mx-auto">
                    Your balance: $50
                </div>
                <p className="max-w-xs mx-auto">
                    You are now given the option to pay a price to randomly draw
                    a ball from the bin, and receive the payoff.
                </p>
                <div className="p-2 text-lg w-full font-bold">
                    Offer price: $28
                </div>
                <div className="flex gap-2 justify-center p-5">
                    <Button variant="alt" text="Accept" size="extra-small" />
                    <Button variant="alt" text="Reject" size="extra-small" />
                </div>
            </div>
            <h3>Bin composition</h3>
            <p>
                At the end of each trial, we will change the bin in one of two
                ways:
            </p>
            <ol>
                <li>
                    <b>Composition change</b>: we change both the number of
                    balls of each colour inside the bin, and the payoffs
                    associated with each colour.
                </li>
                <li>
                    <b>Payoff change</b>: we change the payoffs associated with
                    each colour. The number of balls of each colour is kept the
                    same.
                </li>
            </ol>
            <p>
                You will be informed when the bin is changed, and which type of
                change occured.
            </p>
            <h3>Performance</h3>
            <p>
                Your performance will depend on your ability to accept cheap
                prices to enter the gamble, and reject expensive prices. Your
                payment for this task will be determined as one-tenth of the
                play-money you have remaining at the end of the trial. You will
                start with $50 in play money, which will increase or decrease
                depending on your performance throughout the task.
            </p>
            <h3>Launch task</h3>
            <p>
                Before proceeding, please ensure you have understood the
                instructions provided.{" "}
                <b>
                    If you have any questions, please raise them with your
                    experimenter.
                </b>{" "}
                On the next screen, you will be given the chance to launch a
                practice session to familiarise youself with the interface. You
                must complete at least one practice session before commencing
                the experiment.
            </p>
        </div>
    );
}
