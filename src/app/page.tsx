"use client";

import { useEffect } from "react";
import {
  CrossmintProvider,
  CrossmintCheckoutProvider,
  CrossmintEmbeddedCheckout,
  useCrossmintCheckout,
} from "@crossmint/client-sdk-react-ui";

// Component with purchase tracking
function Checkout() {
  const { order } = useCrossmintCheckout();
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;

  useEffect(() => {
    if (order && order.phase === "completed") {
      console.log("Purchase completed!");
      // Handle successful purchase
    }
  }, [order]);

  return (
      <CrossmintEmbeddedCheckout
          lineItems={[
            {
              collectionLocator: `crossmint:${collectionId}`,
              callData: {
                totalPrice: "0.001",
                quantity: 1,
              },
            },
            {
              collectionLocator: `crossmint:${collectionId}`,
              callData: {
                totalPrice: "0.002",
                quantity: 2,
              },
            },
          ]}
          payment={{
            crypto: {
              enabled: true,
              defaultChain: "polygon", // Set preferred blockchain
              defaultCurrency: "matic", // Set preferred crypto
            },
            fiat: {
              enabled: true,
              defaultCurrency: "usd", // Set preferred fiat currency
              allowedMethods: {
                card: true,
                applePay: true,
                googlePay: true,
              },
            },
            receiptEmail: "receipt@example.com", // Optional: Set receipt email
          }}
          recipient={{
            email: "buyer@example.com", // NFTs will be delivered to this email's wallet
            // Or use walletAddress: "0x..." for direct delivery
          }}
          locale="en-US" // Set interface language
      />
  );
}

// Main component with providers
export default function Home() {
  const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_API_KEY as string;

  return (
      <div className="flex flex-col items-center justify-start min-h-screen p-6">
        <CrossmintProvider apiKey={clientApiKey}>
          <CrossmintCheckoutProvider>
            <Checkout />
          </CrossmintCheckoutProvider>
        </CrossmintProvider>
      </div>
  );
}