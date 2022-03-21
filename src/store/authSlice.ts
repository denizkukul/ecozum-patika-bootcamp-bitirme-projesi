import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../helpers/cookies';
import { RootState } from './store';
import { LoginRequest, RegisterRequest } from '../services/server/controllers/auth/types';
import auth from '../services/server/controllers/auth';

type AuthState = {
  status: 'loading' | 'idle';
  value: {
    userID: number | null;
    username: string | null;
  }
}

const initialState: AuthState = {
  status: 'idle',
  value: {
    userID: Number(getCookie('userID')) || Number(sessionStorage.getItem('userID')),
    username: getCookie('username') || sessionStorage.getItem('username')
  }
}

export const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        auth.logout();
        state.value.userID = null;
        state.value.username = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
          state.value.userID = action.payload.id;
          state.value.username = action.payload.username;
          state.status = 'idle';
        })
        .addCase(register.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(register.fulfilled, (state, action) => {
          state.value.userID = action.payload.id;
          state.value.username = action.payload.username;
          state.status = 'idle';
        })
    }
  }
);

export const login = createAsyncThunk(
  'login',
  async (payload: { loginData: LoginRequest, authPersistence: boolean }) => {
    return auth.login(payload.loginData, payload.authPersistence).then(response => response.data)
  }
);

export const register = createAsyncThunk(
  'register',
  async (payload: RegisterRequest) => {
    return auth.register(payload).then(response => response.data);
  }
);

export const selectAuth = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;