import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { LabelTypeResponse } from '../../services/server/controllers/label';
import { Board, boardsReducer } from '../boards/boardsReducer';
import { Checklist, checklistsReducer } from '../checklists/checklistsReducer';
import { Card, cardsReducer } from '../cards/cardsReducer';
import { List, listsReducer } from '../lists/listsReducer';
import { miscReducer } from './miscReducer';

export type AppState = {
  status: 'loading' | 'idle'
  boardIDs: number[]
  labelTypes: { [key: number]: LabelTypeResponse }
  boards: { [key: number]: Board }
  lists: { [key: number]: List }
  cards: { [key: number]: Card }
  checklists: { [key: number]: Checklist }
}

export const initialAppState: AppState = {
  status: 'idle',
  boardIDs: [],
  labelTypes: {},
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

// This part is for splitting the reducer code
const passToBoardsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('boardActions/');
}
const passToListsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('listActions/');
}
const passToCardsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('cardActions/');
}
const passToChecklistsReducer = (action: AnyAction): action is PayloadAction<any> => {
  return action.type.startsWith('checklistActions/');
}

export const appReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addMatcher(passToBoardsReducer, (state, action) => {
        return boardsReducer(state, action);
      })
      .addMatcher(passToListsReducer, (state, action) => {
        return listsReducer(state, action);
      })
      .addMatcher(passToCardsReducer, (state, action) => {
        return cardsReducer(state, action);
      })
      .addMatcher(passToChecklistsReducer, (state, action) => {
        return checklistsReducer(state, action);
      })
      .addDefaultCase((state, action) => {
        return miscReducer(state, action)
      })
  }
)


