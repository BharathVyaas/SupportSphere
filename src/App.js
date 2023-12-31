import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Fundraiser from "./pages/Fundraiser";

function App() {
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
