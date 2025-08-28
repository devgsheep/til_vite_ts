import { useContext } from 'react';
import { ShopContext } from '../ShopContext';

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('에러');
  }
  return ctx;
}
