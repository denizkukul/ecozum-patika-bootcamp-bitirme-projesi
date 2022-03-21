import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import boardRequests, { BoardResponse, BoardRequest } from '../services/server/controllers/board';
import memberRequests, { Member } from '../services/server/controllers/member';
import listRequests, { CreateListRequest, ListResponse, UpdateListRequest } from '../services/server/controllers/list';
import cardRequests, { CreateCardRequest, NestedCardResponse, UpdateCardRequest } from '../services/server/controllers/card';
import { RootState } from './store';
import { MemberRequest } from '../services/server/controllers/member/types';

type Board = BoardResponse & {
  listIDs: number[]
  members: Member[]
}

export type List = ListResponse & {
  cardIDs: number[]
}

export type Card = NestedCardResponse;

type AppDataState = {
  status: 'idle' | 'loading'
  boardIDs: number[]
  boardsData: { [key: number]: Board }
  listsData: { [key: string]: List }
  cardsData: { [key: number]: Card }
}

const initialState: AppDataState = {
  status: 'idle',
  boardIDs: [],
  boardsData: {},
  listsData: {},
  cardsData: {}
}

export const appdataSlice = createSlice(
  {
    name: 'appdata',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      //TODO: Find a way to split this
      //TODO: Add pending and rejected cases
      builder
        .addCase(createBoard.pending, (state) => {
          // state.boardsData.status = 'loading';
        })
        .addCase(createBoard.fulfilled, (state, action) => {
          const boardID = action.payload.id;
          const board = action.payload;
          state.boardsData[boardID] = { ...board, listIDs: [], members: [] };
          state.boardIDs.push(boardID);
          // state.status = 'idle';
        })
        .addCase(updateBoard.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(updateBoard.fulfilled, (state, action) => {
          const boardID = action.meta.arg.id;
          const updateData = action.meta.arg.updateData;
          let boardData = state.boardsData[boardID];
          boardData = { ...boardData, ...updateData }
          state.boardsData[boardID] = boardData
          // state.status = 'idle';
        })
        .addCase(deleteBoard.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(deleteBoard.fulfilled, (state, action) => {
          const boardID = action.meta.arg.id;
          const listIDs = state.boardsData[boardID].listIDs;
          listIDs.forEach(listID => {
            const cardIDs = state.listsData[listID].cardIDs;
            cardIDs.forEach(cardID => {
              delete state.cardsData[cardID];
            })
            delete state.listsData[listID];
          })
          delete state.boardsData[boardID];
          const index = state.boardIDs.indexOf(boardID);
          state.boardIDs.splice(index, 1);
          // state.status = 'idle';
        })
        .addCase(getBoard.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getBoard.fulfilled, (state, action) => {
          const { lists, members, ...baseBoardData } = { ...action.payload }
          const boardID = action.payload.id;
          const listIDs: number[] = [];
          lists.sort((list1, list2) => {
            if (list1.order && list2.order) return list1.order - list2.order
            // If order is null move to end of the list
            else return 1
          })
          lists.forEach(list => {
            listIDs.push(list.id);
            const { cards, ...baseListData } = { ...list };
            const cardIDs: number[] = [];
            cards.sort((card1, card2) => {
              if (card1.order && card2.order) return card1.order - card2.order
              // If order is null move to end of the list
              else return 1
            })
            cards.forEach(card => {
              cardIDs.push(card.id);
              state.cardsData[card.id] = card;
            })
            const listData = { ...baseListData, cardIDs }
            state.listsData[list.id] = listData;
          })
          const boardData = { ...baseBoardData, listIDs, members }
          state.boardsData[boardID] = boardData;
          state.status = 'idle';
        })
        .addCase(getBoardList.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(getBoardList.fulfilled, (state, action) => {
          const newBoardIDs: number[] = [];
          const newBoardsData: { [key: number]: Board; } = {};
          action.payload.forEach(board => {
            newBoardIDs.push(board.id);
            newBoardsData[board.id] = { ...board, listIDs: [], members: [] };
          });
          state.boardIDs = newBoardIDs;
          state.boardsData = newBoardsData;
          // state.status = 'idle';
        })
        .addCase(createList.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(createList.fulfilled, (state, action) => {
          const boardID = action.meta.arg.boardId;
          const listID = action.payload.id;
          const list = action.payload;
          state.listsData[listID] = { ...list, cardIDs: [] };
          state.boardsData[boardID].listIDs.push(listID);
          // state.status = 'idle';
        })
        .addCase(updateList.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(updateList.fulfilled, (state, action) => {
          const listID = action.meta.arg.id;
          const updateData = action.meta.arg.updateData;
          let listData = state.listsData[listID];
          listData = { ...listData, ...updateData };
          state.listsData[listID] = listData;
          // state.status = 'idle';
        })
        .addCase(deleteList.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(deleteList.fulfilled, (state, action) => {
          const listID = action.meta.arg.id;
          const cardIDs = state.listsData[listID].cardIDs;
          const boardID = state.listsData[listID].boardId;
          delete state.listsData[listID];
          cardIDs.forEach((cardID) => {
            delete state.cardsData[cardID];
          })
          const index = state.boardsData[boardID].listIDs.indexOf(listID);
          state.boardsData[boardID].listIDs.splice(index, 1);
          // state.status = 'idle';
        })
        .addCase(getList.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(getList.fulfilled, (state, action) => {
          const { cards, ...baseListData } = { ...action.payload }
          const listID = action.payload.id;
          const cardIDs: number[] = [];
          cards.forEach(card => {
            cardIDs.push(card.id);
            state.cardsData[card.id] = card;
          })
          const listData = { ...baseListData, cardIDs }
          state.listsData[listID] = listData;
          // state.status = 'idle';
        })
        .addCase(createCard.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(createCard.fulfilled, (state, action) => {
          const listID = action.meta.arg.listId;
          const cardID = action.payload.id;
          const card = action.payload;
          state.cardsData[cardID] = { ...card };
          state.listsData[listID].cardIDs.push(cardID);
          // state.status = 'idle';
        })
        .addCase(updateCard.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(updateCard.fulfilled, (state, action) => {
          const cardID = action.meta.arg.id;
          const updateData = action.meta.arg.updateData;
          let cardData = state.cardsData[cardID];
          cardData = { ...cardData, ...updateData };
          state.cardsData[cardID] = cardData;
          // state.status = 'idle';
        })
        .addCase(deleteCard.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(deleteCard.fulfilled, (state, action) => {
          const cardID = action.meta.arg.id;
          const listID = state.cardsData[cardID].listId;
          delete state.cardsData[cardID];
          const index = state.listsData[listID].cardIDs.indexOf(cardID);
          state.listsData[listID].cardIDs.splice(index, 1);
          // state.status = 'idle';
        })
        .addCase(getCard.pending, (state) => {
          // state.status = 'loading';
        })
        .addCase(getCard.fulfilled, (state, action) => {
          const cardID = action.payload.id;
          let card = state.cardsData[cardID]
          card = action.payload;
          state.listsData[card.listId].cardIDs.push(cardID);
          // state.status = 'idle';
        })
        .addCase(changeListOrder.fulfilled, (state, action) => {
          const boardID = action.meta.arg.boardID;
          const listIDs = action.meta.arg.listIDs;
          state.boardsData[boardID].listIDs = listIDs;
        })
        .addCase(changeCardOrder.fulfilled, (state, action) => {
          const listID = action.meta.arg.listID;
          const cardIDs = action.meta.arg.cardIDs;
          state.listsData[listID].cardIDs = cardIDs;
        })
        .addCase(changeCardParentList.fulfilled, (state, action) => {
          const sourceListID = action.meta.arg.sourceListID;
          const sourceCardIDs = action.meta.arg.sourceCardIDs;
          state.listsData[sourceListID].cardIDs = sourceCardIDs;
          const targetListID = action.meta.arg.targetListID;
          const targetCardIDs = action.meta.arg.targetCardIDs;
          state.listsData[targetListID].cardIDs = targetCardIDs;
        })
        .addCase(removeMember.fulfilled, (state, action) => {
          const boardID = action.meta.arg.boardID;
          const memberID = action.meta.arg.memberID;
          const membersData = state.boardsData[boardID].members;
          const memberIndex = membersData.findIndex(member => member.BoardMember.id === memberID);
          membersData.splice(memberIndex, 1);
        })
    }
  }
)

export const changeListOrder = createAsyncThunk(
  'changeListOrder',
  async (payload: { boardID: number, listIDs: number[] }) => {
    payload.listIDs.forEach((listID, index) => {
      listRequests.update(listID, { order: index + 1 })
    })
  }
)


export const changeCardOrder = createAsyncThunk(
  'changeCardOrder',
  async (payload: { listID: number, cardIDs: number[] }) => {
    payload.cardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1 })
    })
  }
)

export const changeCardParentList = createAsyncThunk(
  'changeCardParentList',
  async (payload: { sourceListID: number, sourceCardIDs: number[], targetListID: number, targetCardIDs: number[] }) => {
    payload.sourceCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1 })
    })
    payload.targetCardIDs.forEach((cardID, index) => {
      cardRequests.update(cardID, { order: index + 1, listId: payload.targetListID })
    })
  }
)

export const createBoard = createAsyncThunk(
  'createBoard',
  async (payload: BoardRequest) => {
    return boardRequests.create(payload).then(response => response.data);
  }
);

export const updateBoard = createAsyncThunk(
  'updateBoard',
  async (payload: { id: number, updateData: BoardRequest }) => {
    return boardRequests.update(payload.id, payload.updateData).then(response => response.data);
  }
);

export const deleteBoard = createAsyncThunk(
  'deleteBoard',
  async (payload: { id: number }) => {
    return boardRequests.destroy(payload.id).then(response => response.data);
  }
);
export const getBoard = createAsyncThunk(
  'getBoard',
  async (id: number) => {
    return boardRequests.getById(id).then(response => response.data);
  }
);

export const getBoardList = createAsyncThunk(
  'getBoardList',
  async () => {
    return boardRequests.getList().then(response => response.data);
  }
);



export const createList = createAsyncThunk(
  'createList',
  async (payload: CreateListRequest) => {
    return listRequests.create(payload).then(response => response.data);
  }
);

export const updateList = createAsyncThunk(
  'updateList',
  async (payload: { id: number, updateData: UpdateListRequest }) => {
    return listRequests.update(payload.id, payload.updateData).then(response => response.data);
  }
);

export const deleteList = createAsyncThunk(
  'deleteList',
  async (payload: { id: number }) => {
    return listRequests.destroy(payload.id).then(response => response.data);
  }
);

export const getList = createAsyncThunk(
  'getList',
  async (id: number) => {
    return listRequests.getById(id).then(response => response.data);
  }
);

export const createCard = createAsyncThunk(
  'createCard',
  async (payload: CreateCardRequest) => {
    return cardRequests.create(payload).then(response => response.data);
  }
);

export const updateCard = createAsyncThunk(
  'updateCard',
  async (payload: { id: number, updateData: UpdateCardRequest }) => {
    return cardRequests.update(payload.id, payload.updateData).then(response => response.data);
  }
);

export const deleteCard = createAsyncThunk(
  'deleteCard',
  async (payload: { id: number }) => {
    return cardRequests.destroy(payload.id).then(response => response.data);
  }
);

export const getCard = createAsyncThunk(
  'getCard',
  async (id: number) => {
    return cardRequests.getById(id).then(response => response.data);
  }
);

export const addMember = createAsyncThunk(
  'addMember',
  async (payload: MemberRequest) => {
    return memberRequests.add(payload).then(response => response.data);
  }
)

export const removeMember = createAsyncThunk(
  'removeMember',
  async (args: { memberID: number, boardID: number }) => {
    return memberRequests.destroy(args.memberID).then(response => response.data);
  }
)

export const getMemberList = createAsyncThunk(
  'getMemberList',
  async (boardID: number) => {
    return memberRequests.destroy(boardID).then(response => response.data);
  }
)


export const appdataReducer = appdataSlice.reducer;

export const selectAppStatus = (state: RootState) => state.appdata.status;
export const selectBoardsData = (state: RootState) => state.appdata.boardsData;
export const selectBoardIDs = (state: RootState) => state.appdata.boardIDs;

export const selectListsData = (state: RootState) => state.appdata.listsData;
export const selectListsStatus = (state: RootState) => state.appdata.status;

export const selectCardsData = (state: RootState) => state.appdata.cardsData;
export const selectCardsStatus = (state: RootState) => state.appdata.status;