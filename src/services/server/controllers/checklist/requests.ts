import { server, endpoints } from '../../server';
import { CreateChecklistRequest, UpdateChecklistRequest, ChecklistResponse } from './types';

export const create = (data: CreateChecklistRequest) => {
  return server.post<ChecklistResponse>(endpoints.checklist, data);
}

export const update = (checklistID: number, data: UpdateChecklistRequest) => {
  return server.put<ChecklistResponse>(`${endpoints.checklist}/${checklistID}`, data);
}

export const destroy = (checklistID: number) => {
  return server.delete(`${endpoints.checklist}/${checklistID}`);
}