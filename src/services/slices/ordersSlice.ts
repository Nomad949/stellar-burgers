import { getFeedsApi, getOrderByNumberApi, getOrdersApi, orderBurgerApi, TFeedsResponse } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types"
import { clearConstructor } from "./constructorSlice";
import { create } from "domain";

type TOrderState = {
  myOrders: TOrder | null;
  ordersFeed: TFeedsResponse | null;
  orderByNumber: TOrder | null;
  orderModalData: TOrder | null;
  orederRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  myOrders: null,
  ordersFeed: null,
  orderByNumber: null,
  orderModalData: null,
  orederRequest: false,
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

export const getMyOrders = createAsyncThunk(
  'orders/myOrders',
  async () => getOrdersApi()
);

export const getFeed = createAsyncThunk(
  'orders/getFeed',
  async () => getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number) 
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers:{

    }
})