import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TSelectItem } from '../../types';
import { fetchAuthors, fetchLocations } from '../thunk/fetchDataThunk';

type TSelectState = {
  dataAuthors: TSelectItem[];
  dataLocations: TSelectItem[];
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  currentPage: number;
};

type TResponseData = {
  data: TSelectItem[];
};

const initialState: TSelectState = {
  dataAuthors: [],
  dataLocations: [],
  isLoading: false,
  isError: false,
  errorText: '',
  currentPage: 1,
};

const selectSlice = createSlice({
  name: 'selects',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    restorePage(state) {
      state.currentPage = 1;
    },
  },
  extraReducers: {
    [fetchAuthors.pending.type]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [fetchAuthors.fulfilled.type]: (state, action: PayloadAction<TResponseData>) => {
      state.isLoading = false;
      state.dataAuthors = action.payload.data;
    },
    [fetchAuthors.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorText = action.payload;
    },

    [fetchLocations.pending.type]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [fetchLocations.fulfilled.type]: (state, action: PayloadAction<TResponseData>) => {
      state.isLoading = false;
      state.dataLocations = action.payload.data;
    },
    [fetchLocations.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorText = action.payload;
    },
  },
});

export const { setCurrentPage, restorePage } = selectSlice.actions;

export default selectSlice.reducer;
