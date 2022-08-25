import { configureStore } from '@reduxjs/toolkit';
import paintingSlice from './reducers/reducerPainting';
import selectSlice from './reducers/reducerSelects';
import themeSlice from './reducers/reducerTheme';

const store = configureStore({
  reducer: {
    paintings: paintingSlice,
    selects: selectSlice,
    theme: themeSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
