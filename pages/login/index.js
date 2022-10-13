import { useForm } from "react-hook-form";
import { useAuth } from "../../lib/firebase/auth";
import { useEffect } from "react";

export default function Login() {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = (data) => {
        auth.signinWithEmail(data.username + "@cbmm.com", data.password, false);
    };

    useEffect(() => {
        auth.clearError();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen p-5 bg-slate-100">
            <div className="flex-grow max-w-3xl">
                <div className="p-8 max-w-sm mx-auto shadow-md rounded-xl bg-white">
                    <div className="text-2xl font-semibold text-slate-800 mb-4">
                        Sign in
                    </div>
                    <div className="text-sm text-slate-500 mb-10">
                        Sign in to complete your registered experiment.
                    </div>
                    <div className="w-full my-5">
                        {auth.error && (
                            <div className="w-full rounded-lg text-xs text-red-600 font-bold p-2 bg-red-50 border border-red-400">
                                {auth.error}
                            </div>
                        )}
                    </div>
                    <form
                        className="w-full"
                        spellcheck="false"
                        onSubmit={handleSubmit(submitHandler)}
                    >
                        <div className="flex flex-col gap-5 w-full text-slate-800 mb-3">
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-medium">
                                    Username
                                </div>
                                <input
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: "Required field",
                                        },
                                        pattern: {
                                            value: /(^cbmm-\d+$|^admin$)/,
                                            message:
                                                "Username should be of form: cbmm-#",
                                        },
                                    })}
                                    type="text"
                                    className={`block w-full rounded-md bg-slate-100 border-transparent focus:border-slate-300 focus:bg-slate-50 focus:ring-0 text-sm p-2 ${
                                        errors.username
                                            ? "border border-red-600 focus:border-red-600"
                                            : ""
                                    }`}
                                    placeholder="cbmm-0000"
                                ></input>
                                <div className="text-xs text-red-600">
                                    {errors.username?.message}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-medium">
                                    Password
                                </div>
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Required field",
                                        },
                                    })}
                                    type="password"
                                    className={`block w-full rounded-md bg-slate-100 border-transparent focus:border-slate-300 focus:bg-slate-50 focus:ring-0 text-sm p-2 ${
                                        errors.password
                                            ? "border border-red-600 focus:border-red-600"
                                            : ""
                                    }`}
                                    placeholder="********"
                                ></input>
                                <div className="text-xs text-red-600">
                                    {errors.password?.message}
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white text-sm rounded-lg py-2 font-semibold mt-3 mb-5"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
