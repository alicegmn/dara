import { Outlet } from "react-router-dom";
import useAccessStore from "@/store/store";
import Header from "./Header";
import PlayerComponent from "../ui/PlayerComponent";
import useTheme from "@/hooks/useTheme";

export default function RootLayout() {
  const accessToken = useAccessStore((state) => state.accessToken);
  const { theme } = useTheme(); // <--- get global theme

  return (
    <div className={`App ${theme} min-h-screen flex flex-col`}>
      {accessToken && <Header />}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      {accessToken && <PlayerComponent />}
    </div>
  );
}
