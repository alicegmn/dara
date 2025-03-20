import { useState, useEffect } from "react";
import axios from "axios";
import useAccessStore from "@/store/store";

export default function useAuth(code: string) {
  const { accessToken: token, addAccessToken } = useAccessStore();
  // Initiera state med eventuell befintlig token från store.
  const [accessToken, setAccessToken] = useState<string | undefined>(token);
  const [expiresIn, setExpiresIn] = useState<number | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();

  // Effekt för inloggning: Använder koden för att hämta accessToken
  useEffect(() => {
    if (!token && code) {
      axios
        .post("http://localhost:3001/login", { code })
        .then(
          (res: {
            data: {
              accessToken: string;
              refreshToken: string;
              expiresIn: number;
            };
          }) => {
            const {
              accessToken: newAccess,
              refreshToken: newRefresh,
              expiresIn,
            } = res.data;
            addAccessToken(newAccess);
            setAccessToken(newAccess);
            setExpiresIn(expiresIn);
            setRefreshToken(newRefresh);
            console.log("Login successful:", res.data);
          }
        )
        .catch((error) => {
          console.error("Login error:", error);
        });
    }
  }, [token, code, addAccessToken]);

  // Effekt för att sätta upp refresh-intervall: Uppdaterar token innan den går ut
  useEffect(() => {
    if (refreshToken && expiresIn) {
      const intervalDuration = (expiresIn - 60) * 1000; // Förny token 60 sekunder innan utgång
      const interval = setInterval(() => {
        axios
          .post("http://localhost:3001/refresh", { refreshToken })
          .then((res: { data: { accessToken: string; expiresIn: number } }) => {
            const { accessToken: newAccess, expiresIn: newExpiresIn } =
              res.data;
            addAccessToken(newAccess);
            setAccessToken(newAccess);
            setExpiresIn(newExpiresIn);
            console.log("Token refreshed successfully");
          })
          .catch((error) => {
            console.error("Error refreshing token:", error);
            // Här kan du även implementera logik för omdirigering eller att rensa tokens
          });
      }, intervalDuration);
      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn, addAccessToken]);

  return accessToken;
}
