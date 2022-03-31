import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { appReducer } from './app/appReducer';
import { authReducer } from './auth/authReducer';
import { statusReducer } from './status/statusReducer';

export const store = configureStore({
  reducer: {
    'app': appReducer,
    'auth': authReducer,
    'status': statusReducer
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