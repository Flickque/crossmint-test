import { AppProps } from "next/app";
import "../styles/globals.css";

export default function LisaApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
