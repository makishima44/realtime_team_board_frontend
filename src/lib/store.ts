import { configureStore } from "@reduxjs/toolkit";
import { teamBoardApi } from "./api-slice";

export const store = configureStore({
  reducer: {
    [teamBoardApi.reducerPath]: teamBoardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(teamBoardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
