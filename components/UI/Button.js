import { MdArrowForward, MdArrowBack, MdLock } from "react-icons/md";

export default function Button({
    onClick,
    variant,
    arrow,
    text,
    size,
    disabled,
}) {
    return (
        <button
            onClick={onClick}
            className={`text-white px-3 py-2 rounded-lg flex gap-2 items-center min-w-[5rem]
			disabled:bg-slate-300 disabled:text-white justify-center ${
                size === "small" && "text-sm"
            }
            ${size === "extra-small" && "text-xs"}
			${
                variant === "primary"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-slate-800 hover:bg-slate-900"
            }`}
            disabled={disabled}
        >
            {disabled ? (
                <>
                    {text}
                    <MdLock />
                </>
            ) : arrow === "forward" ? (
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
                text
            )}
        </button>
    );
}
