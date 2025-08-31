import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  burger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

export const initialState: TConstructorState = {
  burger: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burger.bun = action.payload;
        } else {
          state.burger.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.burger.ingredients = state.burger.ingredients.filter(
        (ing) => ing.id !== action.payload.id
      );
    },

    moveIngredients: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      [state.burger.ingredients[from], state.burger.ingredients[to]] = [
        state.burger.ingredients[to],
        state.burger.ingredients[from]
      ];
    },

    clearConstructor: (state) => {
      state.burger.bun = null;
      state.burger.ingredients = [];
    }
  },
  selectors: {
    getBurgerItemsSelector: (state) => state.burger,
    getItemsForOrder: createSelector(
      (state: TConstructorState) => state.burger,
      (burger) => {
        const items = [burger.bun, ...burger.ingredients, burger.bun];
        return items.map((item) => item?._id);
      }
    )
  }
});

export const { getBurgerItemsSelector, getItemsForOrder } =
  constructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  moveIngredients,
  clearConstructor
} = constructorSlice.actions;
