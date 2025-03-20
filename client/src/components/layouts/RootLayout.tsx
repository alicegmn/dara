import { Outlet } from "react-router-dom";
import Header from "./Header";
import PlayerComponent from "@/components/ui/PlayerComponent";
import useAccessStore from "@/store/store";

export default function RootLayout() {
  const accessToken = useAccessStore((state) => state.accessToken);

  return (
    <div className="min-h-screen flex flex-col">
      {accessToken && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {accessToken && <PlayerComponent />}
    </div>
  );
}
