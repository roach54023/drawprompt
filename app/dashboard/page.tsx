"use client";

import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Transaction {
  type: string;
  amount: number;
  balance_after: number;
  description: string;
  created_at: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { userData, loading } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setTxLoading(true);
      fetch("/api/user/credits?page=1&limit=20")
        .then((res) => res.json())
        .then((data) => setTransactions(data.transactions || []))
        .catch(console.error)
        .finally(() => setTxLoading(false));
    }
  }, [userData]);

  if (status === "unauthenticated") {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h1 style={{ fontSize: 24, color: "#2d2926", marginBottom: 16 }}>Dashboard</h1>
        <p style={{ color: "#6b5b4e" }}>Please sign in to view your dashboard.</p>
      </div>
    );
  }

  if (loading || !userData) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <p style={{ color: "#8c7b6b" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#2d2926",
          margin: "0 0 32px",
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        Dashboard
      </h1>

      {/* Stats cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Credits Balance" value={`⚡ ${userData.credits.balance}`} />
        <StatCard
          label="Membership"
          value={userData.membership.is_active ? userData.membership.raw_plan.toUpperCase() : "FREE"}
          subtitle={
            userData.membership.expires_at
              ? `Expires: ${new Date(userData.membership.expires_at).toLocaleDateString()}`
              : undefined
          }
        />
        <StatCard
          label="Today Remaining"
          value={`${userData.membership.daily_remaining} / ${userData.membership.daily_limit}`}
        />
        <StatCard label="Total Used" value={`${userData.credits.total_consumed} credits`} />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        <Link
          href="/pricing"
          style={{
            background: "#c8a77a",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Buy Credits
        </Link>
        <Link
          href="/ai-prompts"
          style={{
            background: "#2d2926",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Browse Prompts
        </Link>
      </div>

      {/* Credit transactions */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: "#2d2926", margin: "0 0 16px" }}>
        Credit History
      </h2>
      {txLoading ? (
        <p style={{ color: "#8c7b6b" }}>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p style={{ color: "#8c7b6b" }}>No transactions yet.</p>
      ) : (
        <div style={{ border: "1px solid #e0ddd8", borderRadius: 12, overflow: "hidden" }}>
          {transactions.map((tx, i) => (
            <div
              key={i}
              style={{
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: i < transactions.length - 1 ? "1px solid #f0ede8" : "none",
                background: "#fff",
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#2d2926" }}>{tx.description}</div>
                <div style={{ fontSize: 11, color: "#a89a8c" }}>
                  {new Date(tx.created_at).toLocaleString()}
                </div>
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: tx.amount > 0 ? "#5a8a5e" : "#d44",
                }}
              >
                {tx.amount > 0 ? "+" : ""}{tx.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, subtitle }: { label: string; value: string; subtitle?: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e0ddd8",
        borderRadius: 12,
        padding: "16px 20px",
      }}
    >
      <div style={{ fontSize: 11, color: "#8c7b6b", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#2d2926" }}>{value}</div>
      {subtitle && <div style={{ fontSize: 11, color: "#a89a8c", marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}
