import { server, endpoints } from '../../server';
import { BoardResponse, BoardRequest, NestedBoardResponse } from './types';

export const create = (payload: BoardRequest) => {
  return server.post<BoardResponse>(endpoints.board, payload);
}

export const update = (id: number, payload: BoardRequest) => {
  return server.put<BoardResponse>(`${endpoints.board}/${id}`, payload);
}

export const destroy = (id: number) => {
  return server.delete(`${endpoints.board}/${id}`);
}

export const getById = (id: number) => {
  return server.get<NestedBoardResponse>(`${endpoints.board}/${id}`);
}

export const getList = () => {
  return server.get<BoardResponse[]>(endpoints.board);
}