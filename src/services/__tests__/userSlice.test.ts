import {
  initialState,
  loginUser,
  registerUser,
  setIsAuthChecked,
  setLogout,
  setUser,
  updateUser, 
  userSlice
} from "../slices/userSlice";

describe('тесты редьюсеров userSlice', () => {
  const mockUserLogin = {
    email: 'max@mail.ru',
    password: 'Qwerty'
  };

  const mockUserReg = {
    email: 'max@mail.ru',
    name: 'Max',
    password: 'Qwerty'
  };

  const mockUserUpdate = {
    email: 'max@mail.ru',
    name: 'Max123'
  };

  const mockAuthResponse = {
    refreshToken: '123',
    accessToken: '321',
    success: true,
    user: {
      email: 'max@mail.ru',
      name: 'Max123'
    }
  };

  test('тест редьюсера setUser на сохранение данных пользователя', () => {
    const state = userSlice.reducer(initialState, setUser(mockUserUpdate));
    expect(state.user).toEqual(mockUserUpdate);
  });

  test('тест постановки флага isAuthChecked в true редьюсера setIsAuthChecked', () => {
    const state = userSlice.reducer(initialState, setIsAuthChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  test('тест удаления пользователя из стора в редьюсере setLogout', () => {
    const loginState = {
      ...initialState,
      user: mockUserUpdate
    };

    const state = userSlice.reducer(loginState, setLogout());
    expect(state.user).toBe(null);
  });


  //Тесты регистрации
  test('тест редьюсера registerUser(pending) установки флага isLoading в true', () => {
    const state = userSlice.reducer(
      initialState,
      registerUser.pending('', mockUserReg)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('тест редьюсера registerUser(fulfilled) сохранения данных пользователя', () => {
    const state = userSlice.reducer(
      initialState,
      registerUser.fulfilled(mockAuthResponse, '', mockUserReg)
    );

    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUserUpdate);
  });

  test('тест редьюсера registerUser(rejected) сохранения ошибки регистрации', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    }
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });


  //Тесты авторизации
  test('тест редьюсера loginUser(pending) установки флага isLoading в true', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.pending('', mockUserLogin)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('тест редьюсера loginUser(fulfilled) сохранения данных пользователя', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.fulfilled(mockAuthResponse, '', mockUserLogin)
    );

    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUserUpdate);
  });

  test('тест редьюсера loginUser(rejected) сохранения ошибки авторизации', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Возникла ошибка авторизации' }
    }
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Возникла ошибка авторизации');
  });


  //Тесты обновления данных пользователя
  test('тест редьюсера updateUser(pending) установки флага isLoading в true', () => {
    const state = userSlice.reducer(
      initialState,
      updateUser.pending('', mockUserReg)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('тест редьюсера updateUser(fulfilled) сохранения данных пользователя', () => {
    const state = userSlice.reducer(
      initialState,
      updateUser.fulfilled(mockAuthResponse, '', mockUserReg)
    );

    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUserUpdate)
  });

  test('тест редьюсера updateUser(rejected) сохранения ошибки обновления данных', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка обновления данных пользователя' }
    }
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка обновления данных пользователя');
  });
});