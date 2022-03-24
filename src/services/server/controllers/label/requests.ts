import { server, endpoints } from '../../server';
import { AddLabelRequest, LabelResponse, LabelOptionResponse } from './types';

export const add = (payload: AddLabelRequest) => {
  return server.post<LabelResponse>(endpoints.label, payload);
}

export const destroy = (id: number) => {
  return server.delete(`${endpoints.label}/${id}`);
}

export const get = () => {
  return server.get<LabelOptionResponse[]>(endpoints.labelOptions);
}