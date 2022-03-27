import { server, endpoints } from '../../server';
import { ListResponse, NestedListResponse, CreateListRequest, UpdateListRequest } from './types';

export const create = (data: CreateListRequest) => {
  return server.post<ListResponse>(endpoints.list, data);
}

export const update = (listID: number, data: UpdateListRequest) => {
  return server.put<ListResponse>(`${endpoints.list}/${listID}`, data);
}

export const destroy = (listID: number) => {
  return server.delete(`${endpoints.list}/${listID}`);
}

export const getById = (listID: number) => {
  return server.get<NestedListResponse>(`${endpoints.list}/${listID}`);
}

export const getList = (boardID: number) => {
  return server.get<ListResponse[]>(`${endpoints.list}?boardId=${boardID}`);
}