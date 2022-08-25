import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthors, fetchLocations } from '../thunk/fetchDataThunk';
import { TSelectItem } from '../../types';

type TSelectState = {
  dataAuthors: TSelectItem[];
  dataLocations: TSelectItem[];
  isLoading: boolean;
  isError: boolean;
  errorText: string;
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
};

const selectSlice = createSlice({
  name: 'selects',
  initialState,
  reducers: {},
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

export default selectSlice.reducer;
