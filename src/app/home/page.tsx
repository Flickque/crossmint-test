"use client";

import { useEffect } from "react";

import {
  CrossmintProvider,
  CrossmintCheckoutProvider,
  CrossmintEmbeddedCheckout,
  useCrossmintCheckout,
} from "@crossmint/client-sdk-react-ui";

function Checkout() {
  const { order } = useCrossmintCheckout();
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;

  useEffect(() => {
    if (order && order.phase === "completed") {
      console.log("Purchase completed!");
    }
  }, [order]);

  return (
    <CrossmintEmbeddedCheckout
      lineItems={[
        {
          collectionLocator: `crossmint:${collectionId}`,
          callData: {
            totalPrice: "1",
            amount: 1,
            tokenId: 1,
            tokenAddress: "0x14196f08a4fa0b66b7331bc40dd6bcd8a1deea9f",
            data: [1],
          },
        },
      ]}
      payment={{
        crypto: { enabled: false },
        fiat: {
          enabled: true,
          allowedMethods: { applePay: true, googlePay: true },
        },
        receiptEmail: "zakhar@lisafoundation.com",
      }}
      recipient={{
        walletAddress: "0xEFEE404D58aD7614E894E55DF4E0434Eea985CFA",
      }}
      locale="en-US" // Set interface language
    />
  );
}

export default function Home() {
  const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_API_KEY as string;

  return (
    <div className="flex flex-col items-center justify-start h-[640px] overflow-scroll min-h-screen p-6 [&>iframe]:!h-full">
      <h2>Crossmint app router</h2>
      <CrossmintProvider apiKey={clientApiKey}>
        <CrossmintCheckoutProvider>
          <Checkout />
        </CrossmintCheckoutProvider>
      </CrossmintProvider>
    </div>
  );
}
