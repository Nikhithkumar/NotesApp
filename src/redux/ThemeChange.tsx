// colorThemeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme();

export const colorThemeSlice = createSlice({
  name: "colorTheme",
  initialState: {
    data: 0,
    theme: colorScheme
  },
  reducers: {
    changeColor(state, action) {
      state.theme = action.payload;
    }
  }
});

export const { changeColor } = colorThemeSlice.actions;
export default colorThemeSlice.reducer;