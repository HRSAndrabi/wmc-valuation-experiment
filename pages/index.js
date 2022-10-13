import { useAuth } from "../lib/firebase/auth";

export default function Home() {
    const auth = useAuth();
    return (
        <div>
            <button
                onClick={() => {
                    auth.signout();
                }}
                className="text-neutral-100 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
            >
                Sign out
            </button>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
    );
}
