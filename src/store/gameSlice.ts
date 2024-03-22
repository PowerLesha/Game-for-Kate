import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface GameState {
  moralHealth: number;
  health: number;
}

const initialState: GameState = {
  moralHealth: 100,
  health: 100,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementHealth(state) {
      state.health = 100; // Increment health by 5 when find something like a treat
    },
    decrementHealth(state) {
      state.health -= 5; // Decrement health by 5 when touched by an enemy
    },
    incrementMoralHealth(state) {
      state.moralHealth = 100;
    },
    decrementMoralHealth(state) {
      state.moralHealth -= 5;
    },
  },
});

export const {
  incrementHealth,
  decrementHealth,
  incrementMoralHealth,
  decrementMoralHealth,
} = gameSlice.actions;

export const selectHealth = (state: RootState) => state.game.health;
export const selectMoralHealth = (state: RootState) => state.game.moralHealth;

export default gameSlice.reducer;
