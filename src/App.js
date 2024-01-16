import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Fundraiser from "./pages/Fundraiser";
import useReSize from "./hooks/use-reSize";
import MedicalExpenses from "./components/MedicalExpenses";

// Lazy Loading
const CrowdFunding = lazy(() => import("./components/CrowdFunding"));

function App() {
  useReSize();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/*",
          element: <Fundraiser />,
          children: [
            {
              path: "crowdfunding",
              element: (
                <Suspense fallback="loading...">
                  <CrowdFunding />
                </Suspense>
              ),
              children: [
                {
                  index: true,
                  element: <MedicalExpenses />,
                  loader: async () => {
                    const res = await fetch(
                      "http://localhost:4001/campaign/view-campaigns:medicalExpenses"
                    );

                    return await res.json();
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
