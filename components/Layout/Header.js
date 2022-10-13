import Link from "next/link";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { useAuth } from "../../lib/firebase/auth";
import { MdAccountCircle } from "react-icons/md";
import cbmmLogo from "../../public/CBMM-logo-2022-no-text.png";

const Header = () => {
    const auth = useAuth();

    return (
        <div className="w-full px-5 py-3 bg-white backdrop-blur-lg z-50">
            <div className="max-w-screen-lg mx-auto flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Link href="/" passHref>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <div className="text-slate-800 font-medium">
                                CBMM
                            </div>
                            <div className="font-mono rounded-full bg-stone-100 text-slate-500 text-xs px-2 py-1 h-fit">
                                remote experiment
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="hidden sm:flex gap-6 items-center">
                    <button
                        onClick={() => {
                            auth.signout();
                        }}
                        className="text-neutral-100 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
                    >
                        Sign out
                    </button>
                </div>
                <div className="flex sm:hidden">
                    <MdMenu className="text-2xl text-slate-800 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default Header;
