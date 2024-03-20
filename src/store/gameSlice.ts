// src/store/gameSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface GameState {
  health: number;
}

const initialState: GameState = {
  health: 100,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementHealth(state) {
      state.health -= 5;
    },
    decrementHealth(state) {
      // Corrected action name
      state.health -= 5; // Decrement health by 5 when touched by an enemy
    },
  },
});

export const { incrementHealth, decrementHealth } = gameSlice.actions;

export const selectHealth = (state: RootState) => state.game.health;

export default gameSlice.reducer;
