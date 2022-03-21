import { server, endpoints } from '../../server';
import { ListResponse, NestedListResponse, CreateListRequest, UpdateListRequest } from './types';

export const create = (payload: CreateListRequest) => {
  return server.post<ListResponse>(endpoints.list, payload);
}

export const update = (id: number, payload: UpdateListRequest) => {
  return server.put<ListResponse>(`${endpoints.list}/${id}`, payload);
}

export const destroy = (id: number) => {
  return server.delete(`${endpoints.list}/${id}`);
}

export const getById = (id: number) => {
  return server.get<NestedListResponse>(`${endpoints.list}/${id}`);
}

export const getList = (boardID: number) => {
  return server.get<ListResponse[]>(`${endpoints.list}?boardId=${boardID}`);
}