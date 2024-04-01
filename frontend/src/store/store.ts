import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
