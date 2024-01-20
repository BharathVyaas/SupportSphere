import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home, { IndexHelmet } from "./pages/Home";
import Fundraiser from "./pages/Fundraiser";
import useReSize from "./hooks/use-reSize";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./service/campaignService";
import MedicalExpenses, {
  MEHelmet,
  loader as MELoader,
} from "./components/MedicalExpenses";
import EducationFunding, {
  EFHelmet,
  loader as EFLoader,
} from "./components/EducationFunding";
import Events from "./pages/Events";

// Lazy Loading
const CrowdFunding = lazy(() => import("./components/CrowdFunding"));

function App() {
  // Emits size event
  useReSize();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <IndexHelmet />
          <Home />
        </>
      ),
      children: [
        {
          path: "/*",
          element: <Fundraiser />,
          children: [
            { path: "events", element: <Events /> },
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
                  element: (
                    <>
                      <MEHelmet />
                      <MedicalExpenses />
                    </>
                  ),
                  loader: MELoader,
                },
                {
                  path: "medical-expenses",
                  element: (
                    <>
                      <MEHelmet />
                      <MedicalExpenses />
                    </>
                  ),
                  loader: MELoader,
                },
                {
                  path: "education-fund",
                  element: (
                    <>
                      <EFHelmet />
                      <EducationFunding />
                    </>
                  ),
                  loader: EFLoader,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
