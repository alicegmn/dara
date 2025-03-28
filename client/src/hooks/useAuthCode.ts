import { useState, useEffect } from "react";

/**
 * Custom hook that extracts the "code" query parameter from the URL,
 * clears it from the URL, and returns the code.
 * Returns null if no code is present.
 */
export function useAuthCode(): string | null {
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (code) {
      setAuthCode(code);
      // Remove the query parameter from the URL for cleanliness.
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return authCode;
}
