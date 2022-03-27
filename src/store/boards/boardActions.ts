import { createAsyncThunk } from '@reduxjs/toolkit';
import { formatBoardData } from '../../helpers/formatData';
import boardRequests, { BoardRequest } from '../../services/server/controllers/board';
import memberRequests, { MemberRequest } from '../../services/server/controllers/member';

export const createBoard = createAsyncThunk(
  'boardActions/createBoard',
  async (arg: { data: BoardRequest }) => {
    return boardRequests.create(arg.data).then(response => response.data);
  }
);

export const updateBoard = createAsyncThunk(
  'boardActions/updateBoard',
  async (arg: { boardID: number, data: BoardRequest }) => {
    return boardRequests.update(arg.boardID, arg.data).then(response => response.data);
  }
);

export const deleteBoard = createAsyncThunk(
  'boardActions/deleteBoard',
  async (arg: { boardID: number }) => {
    return boardRequests.destroy(arg.boardID).then(response => response.data);
  }
);

export const getBoard = createAsyncThunk(
  'boardActions/getBoard',
  async (arg: { boardID: number }) => {
    return boardRequests.getById(arg.boardID).then(response => response.data);
  }
);

export const getBoardList = createAsyncThunk(
  'boardActions/getBoardList',
  async () => {
    return boardRequests.getList().then(response => response.data);
  }
);

export const addMember = createAsyncThunk(
  'boardActions/addMember',
  async (arg: { data: MemberRequest }) => {
    return memberRequests.create(arg.data).then(response => response.data);
  }
);

export const removeMember = createAsyncThunk(
  'boardActions/removeMember',
  async (arg: { memberID: number, boardID: number }) => {
    return memberRequests.destroy(arg.memberID).then(response => response.data);
  }
);

export const getMemberList = createAsyncThunk(
  'boardActions/getMemberList',
  async (arg: { boardID: number }) => {
    return memberRequests.getList(arg.boardID).then(response => response.data);
  }
);