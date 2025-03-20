import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ArtistId from "@/pages/ArtistId";
// import Player from "@/pages/Player";
import Reset from "@/pages/Reset";
import AuthProvider from "@/providers/AuthProvider";

const router = createBrowserRouter([
  {
    // Huvudlayout som omsluter alla routes
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/Player",
      //   element: <Player />,
      // },
      {
        path: "/artist/:id",
        element: <ArtistId />,
      },
      {
        path: "/reset",
        element: <Reset />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
