// levelSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
interface LevelState {
  currentLevel: number;
  completedLevels: number[];
}

const initialState: LevelState = {
  currentLevel: 1,
  completedLevels: [],
};

const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    completeLevel(state) {
      state.completedLevels.push(state.currentLevel);
      state.currentLevel++;
    },
    resetLevels(state) {
      state.currentLevel = 1;
      state.completedLevels = [];
    },
  },
});

export const { completeLevel, resetLevels } = levelSlice.actions;

export const showLevel = (state: RootState) => state.level.currentLevel;

export default levelSlice.reducer;
