import { useContext } from 'react';
import { StoreContext } from '../context/StoreContextValue';

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside a <StoreProvider>');
  }
  return ctx;
}

