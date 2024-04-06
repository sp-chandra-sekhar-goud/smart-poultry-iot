import "../styles/globals.css";
import { ModeProvider } from "../contexts/ModeContext";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ModeProvider>
        <Component {...pageProps} />
      </ModeProvider>
    </SessionProvider>
  );
}
