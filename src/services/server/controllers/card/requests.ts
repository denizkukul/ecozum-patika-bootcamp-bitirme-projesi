import { server, endpoints } from '../../server';
import { CardResponse, NestedCardResponse, CreateCardRequest, UpdateCardRequest } from './types';

export const create = (payload: CreateCardRequest) => {
  return server.post<CardResponse>(endpoints.card, payload);
}

export const update = (id: number, payload: UpdateCardRequest) => {
  return server.put<CardResponse>(`${endpoints.card}/${id}`, payload);
}

export const destroy = (id: number) => {
  return server.delete(`${endpoints.card}/${id}`);
}

export const getById = (id: number) => {
  return server.get<NestedCardResponse>(`${endpoints.card}/${id}`);
}

export const getList = () => {
  return server.get<NestedCardResponse[]>(endpoints.card);
}