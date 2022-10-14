import "../styles/globals.css";
import { AuthProvider } from "../lib/firebase/auth";
import { ParticipantProvider } from "../lib/firebase/participant";

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <AuthProvider>
            <ParticipantProvider>
                {getLayout(<Component {...pageProps} />)}
            </ParticipantProvider>
        </AuthProvider>
    );
}

export default MyApp;
