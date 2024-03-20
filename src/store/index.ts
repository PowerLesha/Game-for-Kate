// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    // Add more reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
