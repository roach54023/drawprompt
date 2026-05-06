"use client";

import { useState, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { PlanType } from "@/lib/qualityConfig";

interface PayPalButtonProps {
  plan: PlanType;
  userId: string;
  onSuccess: () => void;
  onError?: (errorMsg: string) => void;
}

export default function PayPalButton({ plan, userId, onSuccess, onError }: PayPalButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // 使用 useRef 保存内部订单 ID，避免 React 重渲染丢失
  const internalOrderIdRef = useRef("");

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", label: "pay" }}
          disabled={processing}
          createOrder={async () => {
            setError(null);
            setProcessing(true);
            try {
              const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan, user_id: userId }),
              });
              const data = await res.json();
              if (!res.ok) {
                throw new Error(data.error || "Failed to create order");
              }
              internalOrderIdRef.current = data.order_id;
              return data.paypal_order_id;
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : "Error creating order";
              setError(msg);
              onError?.(msg);
              setProcessing(false);
              throw err;
            }
          }}
          onApprove={async (data) => {
            try {
              const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  paypal_order_id: data.orderID,
                  order_id: internalOrderIdRef.current,
                }),
              });
              const result = await res.json();
              if (result.success) {
                setError(null);
                onSuccess();
              } else {
                const msg = result.error || "Payment failed";
                setError(msg);
                onError?.(msg);
              }
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : "Payment capture error";
              setError(msg);
              onError?.(msg);
            } finally {
              setProcessing(false);
            }
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            const msg = "PayPal encountered an error. Please try again.";
            setError(msg);
            onError?.(msg);
            setProcessing(false);
          }}
          onCancel={() => {
            setProcessing(false);
          }}
        />
      </PayPalScriptProvider>
      {error && (
        <p style={{ color: "#d44", fontSize: 12, marginTop: 8, textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}
