import axios from 'axios';
import { getCookie } from '../../helpers/cookies';

export const endpoints = {
  base: 'http://localhost:80',
  register: '/auth/register',
  login: '/auth/login',
  board: '/board',
  list: '/list',
  card: '/card',
  member: '/board-member'
}

const token = getCookie('token') || sessionStorage.getItem('token');

export const server = axios.create({
  baseURL: endpoints.base,
})

if (token) {
  server.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}