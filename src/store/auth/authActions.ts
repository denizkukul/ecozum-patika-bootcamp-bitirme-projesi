import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import auth, { LoginRequest, RegisterRequest } from '../../services/server/controllers/auth';


export const login = createAsyncThunk(
  'authActions/login',
  async (arg: { data: LoginRequest, authPersistence: boolean }, { rejectWithValue }) => {
    return auth.login(arg.data).then(response => response.data).catch(error => {
      return rejectWithValue(error.response.status)
    })
  }
);

export const register = createAsyncThunk(
  'authActions/register',
  async (arg: { data: RegisterRequest }, { rejectWithValue }) => {
    return auth.register(arg.data).then(response => response.data).catch(error => {
      return rejectWithValue(error.response.status)
    })
  }
);

export const logout = createAction('authActions/logout');
