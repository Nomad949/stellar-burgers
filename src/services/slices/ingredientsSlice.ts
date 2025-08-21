import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  status: 'idle',
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isLoading
  }
});

export const { getIngredientsSelector, getIngredientsLoading } =
  ingredientsSlice.selectors;
