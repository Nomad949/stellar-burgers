import { TIngredient } from "@utils-types";
import { addIngredient, clearConstructor, constructorSlice, moveIngredients, removeIngredient } from "../slices/constructorSlice";

describe('тесты редьюсера constructorSlice', () => {
  const mockBun: TIngredient = {
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
  };
    
  const mockIngredient: TIngredient = {
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
  };

  const mockIngredient2: TIngredient = {
    _id: '3',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
};

  test('тест добавления булки в конструктор', () => {
    //добавляем ингридиент в конструктор
    const state = constructorSlice.reducer(
      undefined,
      addIngredient(mockIngredient)
    );

    //проверяем, что он там появился
    expect(state.burger.ingredients.length).toBe(1);
    expect(state.burger.ingredients[0]).toMatchObject(mockIngredient);
  });

  test('тест удаления ингридиента', () => {
    //добавляем ингридиент в конструктор и проверяем, что он там есть
    const add = constructorSlice.reducer(
      undefined,
      addIngredient(mockIngredient)
    );

    expect(add.burger.ingredients.length).toBe(1);

    //удаляем ингредиент и проверяем, что конструктор пуст
    const toRemove = add.burger.ingredients[0];
    const remove = constructorSlice.reducer(add, removeIngredient(toRemove));
    expect(remove.burger.ingredients.length).toBe(0);
  });

  test('тест порядка изменения ингридиентов в начинке', () => {
    //добавляем ингридиенты, сначала 1 потом второй
    const addedFirst = constructorSlice.reducer(
      undefined,
      addIngredient(mockIngredient)
    );

    const addedSecond = constructorSlice.reducer(
      addedFirst,
      addIngredient(mockIngredient2)
    );

    //меняем ингридиенты местами и проверяем, что поменялись
    const changeOrder = constructorSlice.reducer(
      addedSecond,
      moveIngredients({ from: 0, to: 1 })
    );

    expect(changeOrder.burger.ingredients[0]._id).toBe('3');
    expect(changeOrder.burger.ingredients[1]._id).toBe('2');
  });

  test('тест очистки конструктора', () => {
    //добавляем ингридиенты, сначала 1 потом второй
    const addedBun = constructorSlice.reducer(
      undefined,
      addIngredient(mockBun)
    );

    const addedIngredient = constructorSlice.reducer(
      addedBun,
      addIngredient(mockIngredient)
    );

    //очищаем конструктор и проверяем что очистился
    const reset = constructorSlice.reducer(addedIngredient, clearConstructor());
    expect(reset.burger.bun).toBe(null);
    expect(reset.burger.ingredients.length).toBe(0);
  })
})