import { server, endpoints } from '../../server';
import { CreateChecklistItemRequest, UpdateChecklistItemRequest, ChecklistItemResponse } from './types';

export const create = (payload: CreateChecklistItemRequest) => {
  return server.post<ChecklistItemResponse>(endpoints.checklistItem, payload);
}

export const update = (id: number, payload: UpdateChecklistItemRequest) => {
  return server.put<ChecklistItemResponse>(`${endpoints.checklistItem}/${id}`, payload);
}

export const destroy = (id: number) => {
  return server.delete(`${endpoints.checklistItem}/${id}`);
}