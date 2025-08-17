import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const reg = await registerUserApi(userData);
    localStorage.setItem('refreshToken', reg.refreshToken);
    setCookie('accessToken', reg.accessToken);
    return reg;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const login = await loginUserApi(userData);
    localStorage.setItem('refreshToken', login.refreshToken);
    setCookie('accessToken', login.accessToken);
    return login;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: TRegisterData) => updateUserApi(userData)
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(setLogout());
      })
      .catch(() => {
        alert('Ошибка выхода из профиля');
      });
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const res = await getUserApi();
        dispatch(setUser(res.user));
      } catch {
        alert('Ошибка аутентификации пользователя');
      } finally {
        dispatch(setIsAuthChecked());
      }
    } else {
      dispatch(setIsAuthChecked());
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setLogout: (state) => {
      state.user = null;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    isLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.user = action.payload.user;
          state.isAuthChecked = true;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.user = action.payload.user;
          state.isAuthChecked = true;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message || 'Возникла ошибка при входе';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка обновления данных пользователя';
      });
  }
});

export const { setUser, setIsAuthChecked, setLogout } = userSlice.actions;

export const { getUser, getIsAuthChecked, isLoading } = userSlice.selectors;
