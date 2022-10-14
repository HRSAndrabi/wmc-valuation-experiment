import { MdArrowForward } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

export default function Button({ onClick, variant, arrow, text, size }) {
    return (
        <button
            onClick={onClick}
            className={`text-white px-3 py-2 rounded-lg flex gap-2 items-center
			disabled:bg-slate-200 disabled:text-white ${size === "small" && "text-sm"}
			${
                variant === "primary"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-slate-800 hover:bg-slate-900"
            }`}
        >
            {arrow === "forward" ? (
                <>
                    {text}
                    <MdArrowForward />
                </>
            ) : arrow === "backward" ? (
                <>
                    <MdArrowBack />
                    {text}
                </>
            ) : (
                { text }
            )}
        </button>
    );
}
