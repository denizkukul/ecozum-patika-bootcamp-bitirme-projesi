import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../app/appReducer';
import { getBoard } from '../boards/boardActions';
import { getCard } from '../cards/cardActions';
import { getList } from '../lists/listActions';
import { createChecklist, createChecklistItem, deleteChecklist, deleteChecklistItem, updateChecklist, updateChecklistItem } from './checklistActions';


type ChecklistItem = {
  id: number;
  checklistId: number;
  isChecked: boolean;
  title: string;
  updatedAt?: string;
  createdAt?: string;
}

export type Checklist = {
  id: number
  cardId: number
  title: string
  updatedAt?: string
  createdAt?: string
  items: ChecklistItem[]
}

const initialAppState: AppState = {
  status: 'idle',
  boardIDs: [],
  labelTypes: {},
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

export const checklistsReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(createChecklist.fulfilled, (state, action) => {
        const cardID = action.payload.cardId;
        const checklistID = action.payload.id;
        const checklist = action.payload;
        state.checklists[checklistID] = { ...checklist, items: [] };
        state.cards[cardID].checklistIDs.push(checklistID);
      })
      .addCase(updateChecklist.fulfilled, (state, action) => {
        const checklistID = action.meta.arg.checklistID;
        state.checklists[checklistID] = { ...state.checklists[checklistID], ...action.meta.arg.data }
      })
      .addCase(deleteChecklist.fulfilled, (state, action) => {
        const checklistID = action.meta.arg.checklistID;
        const cardID = state.checklists[checklistID].cardId;
        delete state.checklists[checklistID];
        const checklistIDs = state.cards[cardID].checklistIDs;
        const index = checklistIDs.indexOf(checklistID);
        checklistIDs.splice(index, 1);
      })
      .addCase(createChecklistItem.fulfilled, (state, action) => {
        const checklistID = action.meta.arg.data.checklistId;
        state.checklists[checklistID].items.push(action.payload);
      })
      .addCase(updateChecklistItem.fulfilled, (state, action) => {
        const checklistID = action.meta.arg.checklistID;
        const itemsArray = state.checklists[checklistID].items;
        const itemID = action.meta.arg.checklistItemID;
        const itemIndex = itemsArray.findIndex(item => item.id === itemID);
        itemsArray[itemIndex] = { ...action.payload };
      })
      .addCase(deleteChecklistItem.fulfilled, (state, action) => {
        const checklistID = action.meta.arg.checklistID;
        const itemsArray = state.checklists[checklistID].items;
        const itemID = action.meta.arg.checklistItemID;
        const itemIndex = itemsArray.findIndex(item => item.id === itemID);
        itemsArray.splice(itemIndex, 1);
      })
  })
