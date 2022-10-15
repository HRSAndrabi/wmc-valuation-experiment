import React from "react";

export default function WmcInstructions() {
    return (
        <div>
            <h2>Task 1: Working memory capacity</h2>
            <p>
                This task assesses the accuracy with which you can recall short
                lists of exclusive number-colour pairings. Each trial within
                this task consists of two phases: the <b>binding phase</b>, and
                the <b>recall phase</b>. You will complete 24 trials of this
                task in total.
            </p>
            <h3>Binding phase</h3>
            <p>
                During the binding phase, you will be successively presented
                with a series of number-colour pairings.{" "}
                <b>Your task is to remember these pairings as best you can.</b>{" "}
            </p>
            <p>
                We will vary the difficulty of trials by increasing or
                decreasing the number of presented pairings.
            </p>
            <div className="text-xs font-light pb-1">
                Binding phase: example presentation of number-colour pairing
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
                After all pairings in a given trial have been presented, you
                will begin the recall phase. You will be successively presented
                with a series of multiple-choice tests that probe your
                recollection of the observed pairings.{" "}
                <b>
                    Your task is to recall the previously observed pairings as
                    best you can.
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
                    Select the number paired with the colour shown below:
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
                Your performance will depend on the number of pairs you can
                accurately recall. Your payment for this task will be calculated
                as your average accuracy across all trials multiplied by $20.
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
