import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import auth, { LoginRequest, RegisterRequest } from "../../services/server/controllers/auth";

export const login = createAsyncThunk(
  'login',
  async (arg: { data: LoginRequest, authPersistence: boolean }) => {
    return auth.login(arg.data).then(response => response.data)
  }
);

export const register = createAsyncThunk(
  'register',
  async (arg: { data: RegisterRequest }) => {
    return auth.register(arg.data).then(response => response.data);
  }
);

export const logout = createAction('logout');