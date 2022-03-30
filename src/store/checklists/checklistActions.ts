import { createAsyncThunk } from '@reduxjs/toolkit';
import checklistRequests, { CreateChecklistRequest, UpdateChecklistRequest } from '../../services/server/controllers/checklist';
import checklistItemRequests, { CreateChecklistItemRequest, UpdateChecklistItemRequest } from '../../services/server/controllers/checklistitem';

export const createChecklist = createAsyncThunk(
  'checklistActions/createChecklist',
  async (arg: { data: CreateChecklistRequest }) => {
    return checklistRequests.create(arg.data).then(response => response.data);
  }
);

export const updateChecklist = createAsyncThunk(
  'checklistActions/updateChecklist',
  async (arg: { checklistID: number, data: UpdateChecklistRequest }) => {
    return checklistRequests.update(arg.checklistID, arg.data).then(response => response.data);
  }
);

export const deleteChecklist = createAsyncThunk(
  'checklistActions/deleteChecklist',
  async (arg: { checklistID: number }) => {
    return checklistRequests.destroy(arg.checklistID).then(response => response.data);
  }
);

export const createChecklistItem = createAsyncThunk(
  'checklistActions/createChecklistItem',
  async (arg: { data: CreateChecklistItemRequest }) => {
    return checklistItemRequests.create(arg.data).then(response => response.data);
  }
)

export const updateChecklistItem = createAsyncThunk(
  'checklistActions/updateChecklistItem',
  async (arg: { checklistID: number, checklistItemID: number, data: UpdateChecklistItemRequest }) => {
    return checklistItemRequests.update(arg.checklistItemID, arg.data).then(response => response.data);
  }
)
export const deleteChecklistItem = createAsyncThunk(
  'checklistActions/deleteChecklistItem',
  async (arg: { checklistID: number, checklistItemID: number }) => {
    return checklistItemRequests.destroy(arg.checklistItemID).then(response => response.data);
  }
)