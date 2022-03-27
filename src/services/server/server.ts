import axios from 'axios';
import { getCookie } from '../../helpers/cookies';

export const endpoints = {
  base: 'http://localhost:80',
  register: '/auth/register',
  login: '/auth/login',
  board: '/board',
  member: '/board-member',
  list: '/list',
  card: '/card',
  comment: '/comment',
  label: '/card-label',
  checklist: '/checklist',
  checklistItem: '/checklist-item',
  labelTypes: '/label'
}

const token = getCookie('token') || sessionStorage.getItem('token');

export const server = axios.create({
  baseURL: endpoints.base,
})

if (token) {
  server.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}