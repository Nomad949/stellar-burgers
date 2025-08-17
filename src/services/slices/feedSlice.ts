import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  isLoading: boolean;
  error: string | null;
  total: number | null;
  totalToday: number | null;
};

const initialState: TFeedState = {
  orders: [],
  status: 'idle',
  isLoading: false,
  error: null,
  total: null,
  totalToday: null
};

export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
        state.isLoading = false;
      });
  }
});
