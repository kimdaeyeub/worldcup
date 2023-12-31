import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddGift from "./pages/AddGift";

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
        path: "/gifts/add",
        element: <AddGift />,
      },
    ],
  },
]);

export default router;
