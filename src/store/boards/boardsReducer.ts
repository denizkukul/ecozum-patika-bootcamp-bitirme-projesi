import { createReducer } from '@reduxjs/toolkit';
import { formatBoardData } from '../../helpers/formatData';
import { AppState } from '../app/appReducer';
import { addMember, createBoard, deleteBoard, getBoard, getBoardList, removeMember, updateBoard } from './boardActions';

type Member = {
  id?: number;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  BoardMember: {
    id: number;
    boardId: number;
    userId: number;
    updatedAt: string;
    createdAt: string;
  }
}

export type Board = {
  id: number;
  ownerId: number;
  title: string;
  updatedAt?: string;
  createdAt?: string;
  listIDs: number[]
  members: Member[]
  owner?: {
    id: number;
    username: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
const initialAppState: AppState = {
  boardIDs: [],
  labelTypes: [],
  boards: {},
  lists: {},
  cards: {},
  checklists: {}
}

export const boardsReducer = createReducer(
  initialAppState,
  (builder) => {
    builder
      .addCase(createBoard.fulfilled, (state, action) => {
        const boardID = action.payload.id;
        const board = action.payload;
        state.boards[boardID] = { ...board, listIDs: [], members: [] };
        state.boardIDs.push(action.payload.id);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const boardID = action.meta.arg.boardID;
        const updateData = action.meta.arg.data;
        let boardData = state.boards[boardID];
        boardData = { ...boardData, ...updateData }
        state.boards[boardID] = boardData
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        const boardID = action.meta.arg.boardID;
        const listIDs = state.boards[boardID].listIDs;
        listIDs.forEach(listID => {
          const cardIDs = state.lists[listID].cardIDs;
          cardIDs.forEach(cardID => {
            const checklistIDs = state.cards[cardID].checklistIDs;
            checklistIDs.forEach(checklistID => {
              delete state.checklists[checklistID];
            })
            delete state.cards[cardID];
          })
          delete state.lists[listID];
        })
        delete state.boards[boardID];
        const index = state.boardIDs.indexOf(boardID);
        state.boardIDs.splice(index, 1);
      })
      .addCase(getBoard.pending, (state) => {
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        const { boardData, listsData, cardsData, checklistsData } = formatBoardData(action.payload);
        state.boards = { ...state.boards, ...boardData }
        state.lists = { ...state.lists, ...listsData }
        state.cards = { ...state.cards, ...cardsData }
        state.checklists = { ...state.checklists, ...checklistsData }
      })
      .addCase(getBoardList.pending, (state) => {
      })
      .addCase(getBoardList.fulfilled, (state, action) => {
        const boardIDs: number[] = []
        action.payload.forEach(board => {
          state.boards[board.id] = { ...board, listIDs: [] };
          boardIDs.push(board.id);
        });
        state.boardIDs = boardIDs;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        const boardID = action.meta.arg.data.boardId;
        const username = action.meta.arg.data.username;
        state.boards[boardID].members.push({ username, BoardMember: { ...action.payload } })
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        const boardID = action.meta.arg.boardID;
        const memberID = action.meta.arg.memberID;
        const memberIndex = state.boards[boardID].members.findIndex(member => member.BoardMember.id === memberID);
        state.boards[boardID].members.splice(memberIndex, 1);
      })
  }
);
