import { Outlet } from "react-router-dom";
import useAccessStore from "@/store/store";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  const accessToken = useAccessStore((state) => state.accessToken);

  return (
    <div className="min-h-screen flex flex-col">
      {accessToken && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {accessToken && <Footer />}
    </div>
  );
}
