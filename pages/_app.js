import "../styles/globals.css";
import { ModeProvider } from "../contexts/ModeContext";

export default function App({ Component, pageProps }) {
  return (
    <ModeProvider>
      <Component {...pageProps} />
    </ModeProvider>
  );
}
