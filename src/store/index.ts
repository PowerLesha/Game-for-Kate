import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import levelReducer from "./levelSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    level: levelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
