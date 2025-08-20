import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getMyOrders,
  getMyOrdersSelector
} from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getMyOrdersSelector) || [];

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
