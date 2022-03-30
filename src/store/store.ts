import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { appReducer } from './app/appReducer';
import { authReducer } from './auth/authReducer';

export const store = configureStore({
  reducer: {
    'auth': authReducer,
    'app': appReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
