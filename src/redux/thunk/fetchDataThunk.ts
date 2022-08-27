import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPaintings, getLocations, getAuthors } from '../../api/api';
import type { TFilter } from '../../types';

export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings',
  async (urlFilter: TFilter, { rejectWithValue }) => {
    try {
      const response = await getPaintings(urlFilter);
      const data = await response.data;
      const totalCount = response.headers['x-total-count'];
      return { data, totalCount };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLocations();
      const data = await response.data;
      return { data };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAuthors();
      const data = await response.data;
      return { data };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
