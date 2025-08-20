import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/userSlice';
import {
  getOrderModalDataSelector,
  getOrderRequestSelector,
  orderBurger,
  resetOrderModalData
} from '../../services/slices/ordersSlice';
import {
  getBurgerItemsSelector,
  getItemsForOrder
} from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const constructorItems = useSelector(getBurgerItemsSelector);
  const itemsForOrder = useSelector(getItemsForOrder);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderModalDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    if (itemsForOrder) {
      dispatch(orderBurger(itemsForOrder as string[]));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
    navigate('/feed');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
