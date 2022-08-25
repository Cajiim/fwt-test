import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchPaintings } from '../thunk/fetchDataThunk';

type TPaintings = {
  author: { name: string };
  created: string;
  id: number;
  imageUrl: string;
  location: { location: string };
  name: string;
};

type TInitial = {
  dataPaintings: TPaintings[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  errorText: string;
};

type TResponseData = {
  data: TPaintings[];
  totalCount: number;
};

const initialState: TInitial = {
  dataPaintings: [],
  totalCount: 0,
  isLoading: false,
  isError: false,
  errorText: '',
};

const paintingSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPaintings.pending.type]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [fetchPaintings.fulfilled.type]: (state, action: PayloadAction<TResponseData>) => {
      state.isLoading = false;
      state.dataPaintings = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    [fetchPaintings.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorText = action.payload;
    },
  },
});

export default paintingSlice.reducer;
