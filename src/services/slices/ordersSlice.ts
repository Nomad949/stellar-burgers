import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TFeedsResponse
} from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { clearConstructor } from './constructorSlice';

type TOrderState = {
  myOrders: TOrder[] | null;
  ordersFeed: TFeedsResponse | null;
  orderByNumber: TOrder | null;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  myOrders: null,
  ordersFeed: null,
  orderByNumber: null,
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'orders/',
  async (data: string[], { dispatch }) => {
    const req = await orderBurgerApi(data);
    dispatch(clearConstructor());
    return req;
  }
);

export const getMyOrders = createAsyncThunk('orders/myOrders', async () =>
  getOrdersApi()
);

export const getFeed = createAsyncThunk('orders/getFeed', async () =>
  getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state) => {
      state.orderRequest = true;
    },
    resetOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getFeedSelector: (state) => state.ordersFeed,
    getOrdersFeedSelector: (state) => state.ordersFeed?.orders,
    getMyOrdersSelector: (state) => state.myOrders,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData,
    getOrderByNumberSelector: createSelector(
      (state: TOrderState) => state.orderByNumber,
      (orderByNumber) => ({
        createdAt: orderByNumber?.createdAt || '',
        ingredients: orderByNumber?.ingredients || [],
        _id: orderByNumber?._id || '',
        status: orderByNumber?.status || '',
        name: orderByNumber?.name || '',
        updatedAt: orderByNumber?.updatedAt || '',
        number: orderByNumber?.number || 0
      })
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      })
      .addCase(getMyOrders.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.myOrders = action.payload;
        state.error = null;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка загрузки ваших заказов';
      })
      .addCase(getFeed.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.ordersFeed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderByNumber = {
          createdAt: action.payload?.orders[0].createdAt || '',
          ingredients: action.payload?.orders[0].ingredients || [],
          _id: action.payload?.orders[0]._id || '',
          status: action.payload?.orders[0].status || '',
          name: action.payload?.orders[0].name || '',
          updatedAt: action.payload?.orders[0].updatedAt || '',
          number: action.payload?.orders[0].number || 0
        };
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка получения заказа';
      });
  }
});

export const { resetOrderModalData } = ordersSlice.actions;

export const {
  getOrdersFeedSelector,
  getMyOrdersSelector,
  getOrderByNumberSelector,
  getFeedSelector,
  getOrderRequestSelector,
  getOrderModalDataSelector
} = ordersSlice.selectors;
