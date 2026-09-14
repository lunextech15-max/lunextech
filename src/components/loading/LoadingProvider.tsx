"use client";

import { createContext, useCallback, useContext, useState } from "react";
import LoadingScreen from "./LoadingScreen";

type LoadingState = {
  /** True once the loading screen has started leaving — safe to run page entrance animations. */
  revealed: boolean;
  /** True once the loading screen is fully gone and scrolling is restored — safe to measure layout. */
  ready: boolean;
};

// Defaults to revealed/ready so components using the hook still work when no provider is present.
const LoadingContext = createContext<LoadingState>({ revealed: true, ready: true });

export function useLoadingState() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const handleExitStart = useCallback(() => setRevealed(true), []);
  const handleComplete = useCallback(() => {
    setRevealed(true);
    setLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ revealed, ready: !loading }}>
      {loading && (
        <LoadingScreen
          isLoading={loading}
          onExitStart={handleExitStart}
          onComplete={handleComplete}
        />
      )}
      {children}
    </LoadingContext.Provider>
  );
}
