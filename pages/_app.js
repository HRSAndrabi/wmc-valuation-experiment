import "../styles/globals.css";
import { AuthProvider } from "../lib/firebase/auth";

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    );
}

export default MyApp;
