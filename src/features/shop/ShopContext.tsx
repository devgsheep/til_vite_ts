import React, { createContext, useReducer, type PropsWithChildren } from 'react';
import { ShopActionType, type ShopValueType } from './types';
import { reducer } from './reducer';
import { initialState } from './state';

// 3. 컨택스트 생성
export const ShopContext = createContext<ShopValueType | null>(null);
// 4. 프로바이더 생성
export const ShopProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // dispatch용 함수 표현식
  const addCart = (id: number): void => {
    dispatch({ type: ShopActionType.ADD_CART, payload: { id } });
  };
  const removeCartOne = (id: number): void => {
    dispatch({ type: ShopActionType.REMOVE_CART_ONE, payload: { id } });
  };
  const clearCartItem = (id: number): void => {
    dispatch({ type: ShopActionType.CLEAR_CART_ITEM, payload: { id } });
  };
  const buyAll = (): void => {
    dispatch({ type: ShopActionType.BUY_ALL });
  };
  const resetCart = (): void => {
    dispatch({ type: ShopActionType.RESET });
  };

  const value: ShopValueType = {
    cart: state.cart,
    goods: state.goods,
    balance: state.balance,
    addCart,
    removeCartOne,
    clearCartItem,
    buyAll,
    resetCart,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
