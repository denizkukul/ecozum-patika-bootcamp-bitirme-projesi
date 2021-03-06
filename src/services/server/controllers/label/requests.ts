import { server, endpoints } from '../../server';
import { AddLabelRequest, LabelResponse, LabelTypeResponse } from './types';

export const create = (data: AddLabelRequest) => {
  return server.post<LabelResponse>(endpoints.label, data);
}

export const destroy = (cardLabelID: number) => {
  return server.delete(`${endpoints.label}/${cardLabelID}`);
}

export const getLabelTypes = () => {
  return server.get<LabelTypeResponse[]>(endpoints.labelTypes);
}