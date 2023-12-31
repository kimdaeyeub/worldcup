import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddGift from "./pages/AddGift";
import AllGifts from "./pages/AllGifts";
import GiftDetail from "./pages/GiftDetail";

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
    ],
  },
]);

export default router;
