import { createSlice } from '@reduxjs/toolkit';

type TThemeState = {
  isDarkTheme: boolean;
};
const initialState: TThemeState = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: 'changeTheme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
