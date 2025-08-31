import {
  getFeed, 
  getMyOrders,
  getOrderByNumber,
  initialState,
  orderBurger,
  ordersSlice,
  resetOrderModalData
} from "../slices/ordersSlice"

describe('тесты редьюсеров ordersSlice', () => {
  const mockOrder = {
    success: true,
    name: 'order',
    order: {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-08-30T16:09:47.606Z',
      updatedAt: '2025-08-30T16:09:48.625Z',
      number: 87491
    }
  };

  const mockMyOrders = {
    orders: [
      {
        _id: '1',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2025-08-30T16:09:47.606Z',
        updatedAt: '2025-08-30T16:09:48.625Z',
        number: 87491
      },
      {
        _id: '68b3cbec673086001ba858e5',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2025-08-31T04:13:32.104Z',
        updatedAt: '2025-08-31T04:13:33.044Z',
        number: 87534
      }
    ]
  };

  const mockFeed = {
    success: true,
    orders: [
      {
        _id: '1',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2025-08-30T16:09:47.606Z',
        updatedAt: '2025-08-30T16:09:48.625Z',
        number: 87491
      },
      {
        _id: '68b3cbec673086001ba858e5',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2025-08-31T04:13:32.104Z',
        updatedAt: '2025-08-31T04:13:33.044Z',
        number: 87534
      }
    ],
    total: 85000,
    totalToday: 35
  }

  //resetOrderModalData
  test('тест редьюсера resetOrderModalData очистка модального окна', () => {
    const res = ordersSlice.reducer(
      {... initialState, orderModalData: mockOrder.order},
      resetOrderModalData()
    );

    expect(res.orderModalData).toBe(null);
  });


  //OrderBurger
  test('тест редьюсера orderBurger(pending) установки флага orderRequest в true', () => {
    const res = ordersSlice.reducer(
      initialState,
      orderBurger.pending('', [])
    );

    expect(res.orderRequest).toBe(true);
    expect(res.error).toBe(null);
  });

  test('тест редьюсера orderBurger(fulfilled) сохранения заказа и установки флага orderRequest в false', () => {
    const res = ordersSlice.reducer(
      {...initialState, orderRequest: true},
      orderBurger.fulfilled(mockOrder, '', [])
    );

    expect(res.orderModalData).toEqual(mockOrder.order);
    expect(res.orderRequest).toBe(false);
    expect(res.error).toBe(null);
  });

  test('тест редьюсера orderBurger(rejected) сохранения ошибки создания заказа', () => {
    const action = {
      type: orderBurger.rejected.type,
      error: { message: 'Ошибка загрузки заказа' }
    }
    const state = ordersSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказа');
  });


  //getMyOrders
  test('тест редьюсера getMyOrders(pending) установки флага orderRequest в true', () => {
    const res = ordersSlice.reducer(
      initialState,
      getMyOrders.pending('', undefined)
    );
  
    expect(res.orderRequest).toBe(true);
    expect(res.error).toBe(null);
  });

  test('тест редьюсера getMyOrders(fulfilled) сохранения истории заказов и установки флага orderRequest в false', () => {
    const res = ordersSlice.reducer(
      {...initialState, orderRequest: true},
      getMyOrders.fulfilled(mockMyOrders.orders, '', undefined)
    );

    expect(res.myOrders).toEqual(mockMyOrders.orders);
    expect(res.orderRequest).toBe(false);
    expect(res.error).toBe(null);
  });

  test('тест редьюсера getMyOrders(rejected) сохранения ошибки истории заказов', () => {
    const action = {
      type: getMyOrders.rejected.type,
      error: { message: 'Ошибка загрузки ваших заказов' }
    }
    const state = ordersSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ваших заказов');
  });


  //getFeed
  test('тест редьюсера getFeed(pending) установки флага orderRequest в true', () => {
    const res = ordersSlice.reducer(
      initialState,
      getFeed.pending('', undefined)
    );
  
    expect(res.orderRequest).toBe(true);
    expect(res.error).toBe(null);
  });

  test('тест редьюсера getFeed(fulfilled) записи ленты заказов и установки флага orderRequest в false', () => {
    const res = ordersSlice.reducer(
      {...initialState, orderRequest: true},
      getFeed.fulfilled(mockFeed, '', undefined)
    );

    expect(res.ordersFeed).toEqual(mockFeed);
    expect(res.orderRequest).toBe(false);
    expect(res.error).toBe(null);
  });

  test('тест редьюсера getFeed(rejected) сохранения ошибки отображения ленты заказов', () => {
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'Ошибка загрузки ленты заказов' }
    }
    const state = ordersSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты заказов');
  });


  //getOrderByNumber
  test('тест редьюсера getOrderByNumber(pending) установки флага orderRequest в true', () => {
    const res = ordersSlice.reducer(
      initialState,
      getOrderByNumber.pending('', 11)
    );
  
    expect(res.orderRequest).toBe(true);
    expect(res.error).toBe(null);
  });
    
  test('тест редьюсера getOrderByNumber(fulfilled) получения заказа по номеру заказа и установки флага orderRequest в false', () => {
    const res = ordersSlice.reducer(
      {...initialState, orderRequest: true},
      getOrderByNumber.fulfilled(mockFeed, '', 11)
    );

    expect(res.orderByNumber).toEqual(mockFeed.orders[0]);
    expect(res.orderRequest).toBe(false);
    expect(res.error).toBe(null);
  });

  test('тест редьюсера getOrderByNumber(rejected) сохранения ошибки заказа', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка получения заказа' }
    }
    const state = ordersSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка получения заказа');
  });
})