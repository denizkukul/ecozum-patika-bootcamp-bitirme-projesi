import { deleteCookie, setCookie } from '../../../../helpers/cookies';
import { server, endpoints } from '../../server';
import { User, LoginRequest, RegisterRequest } from './types';

export const login = async (payload: LoginRequest, authPersistence: boolean) => {
  return server.post<User>(endpoints.login, payload)
    .then((response) => {
      server.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      if (authPersistence) {
        setCookie('token', response.data.token); //TODO: set expiration date
        setCookie('userID', String(response.data.id));
        setCookie('username', response.data.username);
      }
      else {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userID', String(response.data.id));
        sessionStorage.setItem('username', response.data.username);
      }
      return response;
    })
}

export const register = async (payload: RegisterRequest) => {
  return server.post<User>(endpoints.register, payload)
    .then((response) => {
      server.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response;
    })
}

export const logout = () => {
  delete server.defaults.headers.common['Authorization'];
  sessionStorage.clear();
  deleteCookie('token');
  deleteCookie('userID');
  deleteCookie('username');
}

