import { server, endpoints } from '../../server';
import { CommentRequest, CommentResponse } from './types';

export const create = (data: CommentRequest) => {
  return server.post<CommentResponse>(endpoints.comment, data);
}

export const destroy = (commentID: number) => {
  return server.delete(`${endpoints.comment}/${commentID}`);
}