import "../styles/globals.css";
import { ModeProvider } from "../contexts/ModeContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModeProvider>
        <Component {...pageProps} />
      </ModeProvider>
    </AuthProvider>
  );
}
