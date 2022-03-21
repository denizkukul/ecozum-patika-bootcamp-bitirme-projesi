import { server, endpoints } from '../../server';
import { BoardMember, MemberRequest } from './types';

export const add = (payload: MemberRequest) => {
  return server.post(endpoints.member, payload);
}

export const getList = (boardID: number) => {
  return server.get<BoardMember[]>(`${endpoints.member}/?boardId=${boardID}`);
}

export const destroy = (memberID: number) => {
  return server.delete(`${endpoints.member}/${memberID}`);
}