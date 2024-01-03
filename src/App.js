import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Fundraiser from "./pages/Fundraiser";
import useReSize from "./hooks/use-reSize";

function App() {
  useReSize();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [{ path: "/*", element: <Fundraiser /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
