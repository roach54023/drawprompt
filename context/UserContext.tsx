"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useSession } from "next-auth/react";

interface UserCredits {
  balance: number;
  total_purchased: number;
  total_consumed: number;
}

interface UserMembership {
  plan: string;
  raw_plan: string;
  expires_at: string | null;
  is_active: boolean;
  daily_limit: number;
  daily_remaining: number;
  allowed_qualities: string[];
}

interface UserData {
  user_id: string;
  name: string;
  email: string;
  image: string;
  credits: UserCredits;
  membership: UserMembership;
}

interface UserContextType {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  loading: true,
  error: null,
  refreshUserData: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.email) {
      setUserData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/user/me");
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        setError(null);
      } else {
        setError("Failed to load user data");
      }
    } catch (err) {
      setError("Network error");
      console.error("Failed to fetch user data:", err);
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        error,
        refreshUserData: fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
