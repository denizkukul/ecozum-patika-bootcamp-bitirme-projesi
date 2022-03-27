import { server, endpoints } from '../../server';
import { CreateChecklistItemRequest, UpdateChecklistItemRequest, ChecklistItemResponse } from './types';

export const create = (data: CreateChecklistItemRequest) => {
  return server.post<ChecklistItemResponse>(endpoints.checklistItem, data);
}

export const update = (checklistItemID: number, data: UpdateChecklistItemRequest) => {
  return server.put<ChecklistItemResponse>(`${endpoints.checklistItem}/${checklistItemID}`, data);
}

export const destroy = (checklistItemID: number) => {
  return server.delete(`${endpoints.checklistItem}/${checklistItemID}`);
}