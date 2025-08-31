import { rootReducer } from "../store";
import { initialState as user } from '../slices/userSlice';
import { initialState as ingredients } from '../slices/ingredientsSlice';
import { initialState as burgerConstructor } from '../slices/constructorSlice';
import { initialState as order } from '../slices/ordersSlice';

describe('тест rootReducer', () => {
  test('проверка инициализации редюсера', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      burgerConstructor,
      ingredients,
      order,
      user
    })
  })
})