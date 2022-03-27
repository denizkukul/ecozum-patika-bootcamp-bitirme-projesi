import { createReducer, createSlice } from '@reduxjs/toolkit';
import { NestedLabelResponse } from '../../services/server/controllers/label';
import { getBoard } from '../boards/boardActions';
import { getList } from '../lists/listActions';
import { createCard, deleteCard, getCard, updateCard } from './cardActions';
import { AppState } from '../app/appReducer';

type Label = {
  id: number
  title: string
  color: string
  createdAt?: string
  updatedAt?: string
  CardLabel?: {
    id: number
    createdAt: string
    updatedAt: string
    cardId: number
    labelId: number
  };
}

type Comment = {
  id: number
  message: string
  createdAt?: string
  updatedAt?: string
  cardId: number
  authorId: number
  author: {
    id: number
    username: string
    createdAt?: string
    updatedAt?: string
  }
}

export type Card = {
  id: number;
  title: string;
  listId: number;
  updatedAt?: string;
  createdAt?: string;
  order?: number
  description?: string
  duedate?: string
  checklistIDs: number[]
  labels: Label[]
  comments: Comment[]
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

export const cardsReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(createCard.fulfilled, (state, action) => {
        const listID = action.payload.listId;
        const cardID = action.payload.id;
        const card = action.payload;
        state.cards[cardID] = { ...card, checklistIDs: [], comments: [], labels: [] };
        state.lists[listID].cardIDs.push(cardID);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const cardID = action.meta.arg.cardID;
        state.cards[cardID] = { ...state.cards[cardID], ...action.meta.arg.data }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const cardID = action.meta.arg.cardID;
        const listID = state.cards[cardID].listId;
        const checklistIDs = state.cards[cardID].checklistIDs;
        checklistIDs.forEach(checklistID => {
          delete state.checklists[checklistID];
        })
        delete state.cards[cardID];
        const cardIDs = state.lists[listID].cardIDs;
        const index = cardIDs.indexOf(cardID);
        cardIDs.splice(index, 1);
      })
      .addCase(getCard.fulfilled, (state, action) => {
        // TODO:
      })
  })