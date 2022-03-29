import { createReducer } from "@reduxjs/toolkit";
import { logout } from "../auth/authActions";
import { AppState } from "./appReducer";
import { changeCardOrder, changeListOrder, getLabelTypes, moveCardToAnotherList } from "./miscActions";

const initialAppState: AppState = {
  status: 'idle',
  boardIDs: [],
  labelTypes: [],
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

export const miscReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(changeListOrder.fulfilled, (state, action) => {
        const boardID = action.meta.arg.boardID;
        const newListIDs = action.meta.arg.newListIDs;
        state.boards[boardID].listIDs = newListIDs;
        newListIDs.forEach((listID, index) => {
          state.lists[listID].order = index + 1;
        })
      })
      .addCase(changeCardOrder.fulfilled, (state, action) => {
        const listID = action.meta.arg.listID;
        const newCardIDs = action.meta.arg.newCardIDs;
        state.lists[listID].cardIDs = newCardIDs;
        newCardIDs.forEach((cardID, index) => {
          state.cards[cardID].order = index + 1;
        })
      })
      .addCase(moveCardToAnotherList.fulfilled, (state, action) => {
        const source = action.meta.arg.source;
        const target = action.meta.arg.target;
        state.lists[source.listID].cardIDs = source.newCardIDs;
        state.lists[target.listID].cardIDs = target.newCardIDs;
        source.newCardIDs.forEach((cardID, index) => {
          state.cards[cardID].order = index + 1
        })
        target.newCardIDs.forEach((cardID, index) => {
          state.cards[cardID].order = index + 1;
          state.cards[cardID].listId = target.listID;
        })
      })
      .addCase(getLabelTypes.fulfilled, (state, action) => {
        state.labelTypes = action.payload;
      })
      .addCase(logout, () => {
        return initialAppState;
      })
  })

