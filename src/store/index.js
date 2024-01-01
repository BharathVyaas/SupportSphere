import { configureStore } from "@reduxjs/toolkit";
import primaryRouteSlice from "./crowdfunding";

const store = configureStore({
  reducer: { primaryRoutes: primaryRouteSlice.reducer },
});

export default store;
