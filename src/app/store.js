import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/admin access/userSlice";

export const store = configureStore({
  reducer: {
    adminReducer: userReducer,
  },
});
