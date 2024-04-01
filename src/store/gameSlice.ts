import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface GameState {
  moralHealth: number;
  health: number;
  money: number;
  words: number;
}

const initialState: GameState = {
  moralHealth: 100,
  health: 100,
  money: 0,
  words: 10,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementHealth(state) {
      state.health = 100; // Increment health to full when find something like a treat
    },
    decrementHealth(state) {
      state.health -= 5; // Decrement health by 5 when touched by an enemy
    },
    incrementHealthWithEnglish(state) {
      state.health += 20;
    },
    decrementHealthWithEnglish(state) {
      state.health -= 60;
    },
    incrementMoralHealth(state) {
      state.moralHealth = 100;
    },
    decrementMoralHealth(state) {
      state.moralHealth -= 5;
    },
    incrementMoney(state) {
      state.money += 200;
    },
    decrementMoney(state) {
      state.money -= 100;
    },
    resetMoney(state) {
      state.money = 0;
    },
    resetWords(state) {
      state.words = 100;
    },
    decrementPoints(state) {
      state.words -= 1;
    },
  },
});

export const {
  incrementHealth,
  decrementHealth,
  decrementPoints,
  incrementHealthWithEnglish,
  decrementHealthWithEnglish,
  incrementMoralHealth,
  decrementMoralHealth,
  incrementMoney,
  decrementMoney,
  resetMoney,
  resetWords,
} = gameSlice.actions;
export const selectWords = (state: RootState) => state.game.words;
export const selectHealth = (state: RootState) => state.game.health;
export const selectMoralHealth = (state: RootState) => state.game.moralHealth;
export const selectMoney = (state: RootState) => state.game.money;

export default gameSlice.reducer;
