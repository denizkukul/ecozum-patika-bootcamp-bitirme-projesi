import { createAsyncThunk } from '@reduxjs/toolkit';
import labelRequests from '../../services/server/controllers/label';
import cardRequests from '../../services/server/controllers/card';
import listRequests from '../../services/server/controllers/list';

export const getLabelTypes = createAsyncThunk(
  'getLabelTypes',
  async () => {
    return labelRequests.getLabelTypes().then(response => response.data);
  }
)

// TODO: This can be made more efficient
export const moveCardToAnotherList = createAsyncThunk(
  'moveCardToAnotherList',
  async (arg: { source: { listID: number, newCardIDs: number[] }, target: { listID: number, newCardIDs: number[] } }) => {
    arg.source.newCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1 })
    })
    arg.target.newCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1, listId: arg.target.listID })
    })
  }
)

export const changeCardOrder = createAsyncThunk(
  'changeCardOrder',
  async (arg: { listID: number, newCardIDs: number[] }) => {
    arg.newCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1 })
    })
  }
)

export const changeListOrder = createAsyncThunk(
  'changeListOrder',
  async (arg: { boardID: number, newListIDs: number[] }) => {
    arg.newListIDs.forEach((listID, index) => {
      listRequests.update(listID, { order: index + 1 })
    })
  }
)