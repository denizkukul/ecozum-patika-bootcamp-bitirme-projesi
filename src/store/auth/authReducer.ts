import { createReducer } from '@reduxjs/toolkit';
import { clearUserData } from '../../helpers/clearUserData';
import { getCookie } from '../../helpers/cookies';
import { saveUserData } from '../../helpers/saveUserData';
import { login, logout, register } from './authActions';
import auth from '../../services/server/controllers/auth';

export type AuthState = {
  status: 'loading' | 'idle';
  userID: number | null;
  username: string | null;
}

export const initialAuthState: AuthState = {
  status: 'idle',
  userID: Number(getCookie('userID')) || Number(sessionStorage.getItem('userID')),
  username: getCookie('username') || sessionStorage.getItem('username')
}

export const authReducer = createReducer(
  initialAuthState,
  (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        saveUserData({ user: action.payload, authPersistence: action.meta.arg.authPersistence });
        state.userID = action.payload.id;
        state.username = action.payload.username;
        state.status = 'idle';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userID = action.payload.id;
        state.username = action.payload.username;
        state.status = 'idle';
      })
      .addCase(logout, (state) => {
        auth.logout();
        clearUserData();
        state.userID = null;
        state.username = null;
      })
  }
);
