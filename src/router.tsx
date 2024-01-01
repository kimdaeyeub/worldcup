import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddGift from "./pages/AddGift";
import AllGifts from "./pages/AllGifts";
import GiftDetail from "./pages/GiftDetail";
import AddWorldcup from "./pages/AddWorldcup";
import PlayTournament from "./pages/PlayTournament";
import TournamentResult from "./pages/TournamentResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "gifts/add",
        element: <AddGift />,
      },
      {
        path: "gifts",
        element: <AllGifts />,
      },
      {
        path: "gifts/:id",
        element: <GiftDetail />,
      },
      {
        path: "worldcups/add",
        element: <AddWorldcup />,
      },
      {
        path: "worldcups/play/:id",
        element: <PlayTournament />,
      },
      {
        path: "worldcups/result/:id",
        element: <TournamentResult />,
      },
    ],
  },
]);

export default router;
