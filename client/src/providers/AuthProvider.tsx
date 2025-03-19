import React from "react";
import useAuth from "@/helpers/useAuth";
import { useAuthCode } from "@/hooks/useAuthCode";

/**
 * AuthProvider omger applikationens barn och kör autentiseringslogiken.
 * Den hämtar koden från URL:en med useAuthCode-hooken och anropar useAuth.
 */
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Hämta auth-kod från URL:en och rensa URL:en
  const code = useAuthCode();

  // Anropa autentiseringshooken med koden (om den finns)
  useAuth(code || "");

  return <>{children}</>;
};

export default AuthProvider;
