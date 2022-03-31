import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../app/appReducer';
import { createList, deleteList, updateList } from './listActions';

export type List = {
  id: number;
  title: string;
  order: number;
  boardId: number;
  updatedAt?: string;
  createdAt?: string;
  cardIDs: number[]
}

const initialAppState: AppState = {
  boardIDs: [],
  labelTypes: [],
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

export const listsReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(createList.fulfilled, (state, action) => {
        const boardID = action.payload.boardId;
        const listID = action.payload.id;
        const list = action.payload;
        state.lists[listID] = { ...list, cardIDs: [] };
        state.boards[boardID].listIDs.push(listID);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const listID = action.meta.arg.listID;
        const updateData = action.meta.arg.data;
        let listData = state.lists[listID];
        listData = { ...listData, ...updateData }
        state.lists[listID] = listData
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const listID = action.meta.arg.listID;
        const boardID = state.lists[listID].boardId;
        const cardIDs = state.lists[listID].cardIDs;
        cardIDs.forEach(cardID => {
          const checklistIDs = state.cards[cardID].checklistIDs
          checklistIDs.forEach(checklistID => {
            delete state.checklists[checklistID];
          })
          delete state.cards[cardID];
        })
        delete state.lists[listID];
        const listIDs = state.boards[boardID].listIDs;
        const index = listIDs.indexOf(listID);
        listIDs.splice(index, 1);
      })
  })