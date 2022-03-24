import { server, endpoints } from '../../server';
import { CommentRequest, CommentResponse } from './types';

export const create = (payload: CommentRequest) => {
  return server.post<CommentResponse>(endpoints.comment, payload);
}

export const destroy = (id: number) => {
  return server.delete(`${endpoints.comment}/${id}`);
}