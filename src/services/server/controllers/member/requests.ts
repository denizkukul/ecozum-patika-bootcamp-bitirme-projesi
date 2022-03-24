import { server, endpoints } from '../../server';
import { MemberRequest, MemberResponse } from './types';

export const add = (payload: MemberRequest) => {
  return server.post<MemberResponse>(endpoints.member, payload);
}

export const getList = (boardID: number) => {
  return server.get<MemberResponse[]>(`${endpoints.member}/?boardId=${boardID}`);
}

export const destroy = (memberID: number) => {
  return server.delete(`${endpoints.member}/${memberID}`);
}