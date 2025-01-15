import Document, { Html, Main, Head, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <>
        <Head></Head>
        <Html>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}
