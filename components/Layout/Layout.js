import { useAuth } from "../../lib/firebase/auth";
import { useEffect } from "react";
import Link from "next/link";
import Header from "./Header";

const Layout = (props) => {
    const auth = useAuth();

    useEffect(() => {
        auth.verifyAccess();
        auth.clearError();
    }, [auth.loading]);

    return (
        <main className="min-h-screen flex flex-col w-full bg-slate-50">
            <Header />
            {props.children}
        </main>
    );
};

export default Layout;
