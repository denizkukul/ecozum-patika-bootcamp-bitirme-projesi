import { createReducer } from '@reduxjs/toolkit';
import { clearUserData } from '../../helpers/userData';
import { getCookie } from '../../helpers/cookies';
import { saveUserData } from '../../helpers/userData';
import { login, logout, register } from './authActions';
import auth from '../../services/server/controllers/auth';

export type AuthState = {
  userID: number | null;
  username: string | null;
}

export const initialAuthState: AuthState = {
  userID: Number(getCookie('userID')) || Number(sessionStorage.getItem('userID')),
  username: getCookie('username') || sessionStorage.getItem('username')
}

export const authReducer = createReducer(
  initialAuthState,
  (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        saveUserData({ user: action.payload, authPersistence: action.meta.arg.authPersistence });
        state.userID = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userID = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(logout, (state) => {
        auth.logout();
        clearUserData();
        state.userID = null;
        state.username = null;
      })
  }
);
