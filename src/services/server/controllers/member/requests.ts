import { server, endpoints } from '../../server';
import { MemberRequest, MemberResponse, MemberListResponse } from './types';

export const create = (data: MemberRequest) => {
  return server.post<MemberResponse>(endpoints.member, data);
}

export const getList = (boardID: number) => {
  return server.get<MemberListResponse[]>(`${endpoints.member}?boardId=${boardID}`);
}

export const destroy = (memberID: number) => {
  return server.delete(`${endpoints.member}/${memberID}`);
}