import { server, endpoints } from '../../server';
import { CreateChecklistRequest, UpdateChecklistRequest, ChecklistResponse } from './types';

export const create = (payload: CreateChecklistRequest) => {
  return server.post<ChecklistResponse>(endpoints.checklist, payload);
}

export const update = (id: number, payload: UpdateChecklistRequest) => {
  return server.put<ChecklistResponse>(`${endpoints.checklist}/${id}`, payload);
}

export const destroy = (id: number) => {
  return server.delete(`${endpoints.checklist}/${id}`);
}