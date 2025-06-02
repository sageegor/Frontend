import { configureStore } from '@reduxjs/toolkit';
import divisionsFilterReducer from '../features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    divisionsFilter: divisionsFilterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;