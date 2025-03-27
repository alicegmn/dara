import { Outlet } from "react-router-dom";
import useAccessStore from "@/store/store";
import Header from "./Header";
import PlayerComponent from "../ui/PlayerComponent";

export default function RootLayout() {
  const accessToken = useAccessStore((state) => state.accessToken);

  return (
    <div className="App light min-h-screen flex flex-col">
      {accessToken && <Header />}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      {accessToken && <PlayerComponent />}
    </div>
  );
}
