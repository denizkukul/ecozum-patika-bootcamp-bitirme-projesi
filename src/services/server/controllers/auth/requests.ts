import { server, endpoints } from '../../server';
import { User, LoginRequest, RegisterRequest } from './types';

export const login = async (data: LoginRequest) => {
  return server.post<User>(endpoints.login, data)
    .then((response) => {
      server.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response;
    })
}

export const register = async (data: RegisterRequest) => {
  return server.post<User>(endpoints.register, data)
    .then((response) => {
      server.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response;
    })
}

export const logout = () => {
  delete server.defaults.headers.common['Authorization'];
}

