import { server, endpoints } from '../../server';
import { BoardResponse, BoardRequest, NestedBoardResponse, BoardListResponse } from './types';

export const create = (data: BoardRequest) => {
  return server.post<BoardResponse>(endpoints.board, data);
}

export const update = (boardID: number, data: BoardRequest) => {
  return server.put<BoardResponse>(`${endpoints.board}/${boardID}`, data);
}

export const destroy = (boardID: number) => {
  return server.delete(`${endpoints.board}/${boardID}`);
}

export const getById = (boardID: number) => {
  return server.get<NestedBoardResponse>(`${endpoints.board}/${boardID}`);
}

export const getList = () => {
  return server.get<BoardListResponse[]>(endpoints.board);
}