import { TIngredient } from "@utils-types"
import {
  getIngredients,
  ingredientsSlice,
  initialState,
  TIngredientsState
} from "../slices/ingredientsSlice";

describe('тесты редюсеров ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '2',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  test('тест на изменение флага isLoading на true при pending', () => {
    const res = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('', undefined)
    );

    expect(res).toEqual({
      ...initialState,
      status: 'loading',
      isLoading: true
    });
  });

  test('тест на сохранение ингридиентов в стор и перевода isLoading в false при fulfilled', () => {
    const prev: TIngredientsState = {
      ...initialState,
      status: 'loading',
      isLoading: true
    };

    const res = ingredientsSlice.reducer(
      prev,
      getIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(res).toEqual({
      ...initialState,
      ingredients: mockIngredients,
      status: 'success',
      isLoading: false
    });
  });

  test('тест записи сообщения об ошибке и перевода isLoading в false при rejected', () => {
    const prev: TIngredientsState = {
      ...initialState,
      status: 'loading',
      isLoading: true
    };

    const error = new Error('Ошибка загрузки');

    const res = ingredientsSlice.reducer(
      prev,
      getIngredients.rejected(error, '', undefined)
    );

    expect(res).toEqual({
      ...initialState,
      status: 'failed',
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
})