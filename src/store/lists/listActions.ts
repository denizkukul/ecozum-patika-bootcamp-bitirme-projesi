import { createAsyncThunk } from '@reduxjs/toolkit';
import listRequests, { CreateListRequest, UpdateListRequest } from '../../services/server/controllers/list';

export const createList = createAsyncThunk(
  'listActions/createList',
  async (arg: { data: CreateListRequest }) => {
    return listRequests.create(arg.data).then(response => response.data);
  }
);

export const updateList = createAsyncThunk(
  'listActions/updateList',
  async (arg: { listID: number, data: UpdateListRequest }) => {
    return listRequests.update(arg.listID, arg.data).then(response => response.data);
  }
);

export const deleteList = createAsyncThunk(
  'listActions/deleteList',
  async (arg: { listID: number }) => {
    return listRequests.destroy(arg.listID).then(response => response.data);
  }
);

export const getList = createAsyncThunk(
  'listActions/getList',
  async (arg: { listID: number }) => {
    return (listRequests.getById(arg.listID).then(response => response.data))
  }
);
