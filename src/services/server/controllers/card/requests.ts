import { server, endpoints } from '../../server';
import { CardResponse, NestedCardResponse, CreateCardRequest, UpdateCardRequest } from './types';

export const create = (data: CreateCardRequest) => {
  return server.post<CardResponse>(endpoints.card, data);
}

export const update = (cardID: number, data: UpdateCardRequest) => {
  return server.put<CardResponse>(`${endpoints.card}/${cardID}`, data);
}

export const destroy = (cardID: number) => {
  return server.delete(`${endpoints.card}/${cardID}`);
}

export const get = (cardID: number) => {
  return server.get<NestedCardResponse>(`${endpoints.card}/${cardID}`);
}

export const getList = (listID: number) => {
  return server.get<NestedCardResponse[]>(`${endpoints.list}?listId=${listID}`);
}