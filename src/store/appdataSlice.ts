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

type BoardsState = {
  status: 'idle' | 'loading'
  boardsData: {
    [key: number]: Board;
  }
  boardIDs: number[]
}

export type List = ListResponse & {
  cardIDs: number[]
}

type ListsState = {
  status: 'idle' | 'loading'
  listsData: {
    [key: string]: List;
  }
}

export type Card = NestedCardResponse;

type CardsState = {
  status: 'idle' | 'loading'
  cardsData: {
    [key: number]: Card;
  }
}

type AppDataState = {
  status: 'idle' | 'loading'
  boards: BoardsState
  lists: ListsState
  cards: CardsState
}

const initialState: AppDataState = {
  status: 'idle',
  boards: {
    status: 'idle',
    boardsData: {},
    boardIDs: []
  },
  lists: {
    status: 'idle',
    listsData: {},
  },
  cards: {
    status: 'idle',
    cardsData: {}
  }
}

export const appdataSlice = createSlice(
  {
    name: 'appdata',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createBoard.pending, (state) => {
          state.boards.status = 'loading';
        })
        .addCase(createBoard.fulfilled, (state, action) => {
          const boardID = action.payload.id;
          const board = action.payload;
          state.boards.boardsData[boardID] = { ...board, listIDs: [], members: [] };
          state.boards.boardIDs.push(boardID);
          state.boards.status = 'idle';
        })
        .addCase(updateBoard.pending, (state) => {
          state.boards.status = 'loading';
        })
        .addCase(updateBoard.fulfilled, (state, action) => {
          const boardID = action.meta.arg.id;
          const updateData = action.meta.arg.updateData;
          let boardData = state.boards.boardsData[boardID];
          boardData = { ...boardData, ...updateData }
          state.boards.boardsData[boardID] = boardData
          state.boards.status = 'idle';
        })
        .addCase(deleteBoard.pending, (state) => {
          state.boards.status = 'loading';
        })
        .addCase(deleteBoard.fulfilled, (state, action) => {
          const boardID = action.meta.arg.id;
          const listIDs = state.boards.boardsData[boardID].listIDs;
          listIDs.forEach(listID => {
            const cardIDs = state.lists.listsData[listID].cardIDs;
            cardIDs.forEach(cardID => {
              delete state.cards.cardsData[cardID];
            })
            delete state.lists.listsData[listID];
          })
          delete state.boards.boardsData[boardID];
          const index = state.boards.boardIDs.indexOf(boardID);
          state.boards.boardIDs.splice(index, 1);
          state.boards.status = 'idle';
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
              state.cards.cardsData[card.id] = card;
            })
            const listData = { ...baseListData, cardIDs }
            state.lists.listsData[list.id] = listData;
          })
          const boardData = { ...baseBoardData, listIDs, members }
          state.boards.boardsData[boardID] = boardData;
          state.status = 'idle';
        })
        .addCase(getBoardList.pending, (state) => {
          state.boards.status = 'loading';
        })
        .addCase(getBoardList.fulfilled, (state, action) => {
          const newBoardIDs: number[] = [];
          const newBoardsData: { [key: number]: Board; } = {};
          action.payload.forEach(board => {
            newBoardIDs.push(board.id);
            newBoardsData[board.id] = { ...board, listIDs: [], members: [] };
          });
          state.boards.boardIDs = newBoardIDs;
          state.boards.boardsData = newBoardsData;
          state.boards.status = 'idle';
        })
        .addCase(createList.pending, (state) => {
          state.lists.status = 'loading';
        })
        .addCase(createList.fulfilled, (state, action) => {
          const boardID = action.meta.arg.boardId;
          const listID = action.payload.id;
          const list = action.payload;
          state.lists.listsData[listID] = { ...list, cardIDs: [] };
          state.boards.boardsData[boardID].listIDs.push(listID);
          state.lists.status = 'idle';
        })
        .addCase(updateList.pending, (state) => {
          state.lists.status = 'loading';
        })
        .addCase(updateList.fulfilled, (state, action) => {
          const listID = action.meta.arg.id;
          const updateData = action.meta.arg.updateData;
          let listData = state.lists.listsData[listID];
          listData = { ...listData, ...updateData };
          state.lists.listsData[listID] = listData;
          state.lists.status = 'idle';
        })
        .addCase(deleteList.pending, (state) => {
          state.lists.status = 'loading';
        })
        .addCase(deleteList.fulfilled, (state, action) => {
          const listID = action.meta.arg.id;
          const cardIDs = state.lists.listsData[listID].cardIDs;
          const boardID = state.lists.listsData[listID].boardId;
          delete state.lists.listsData[listID];
          cardIDs.forEach((cardID) => {
            delete state.cards.cardsData[cardID];
          })
          const index = state.boards.boardsData[boardID].listIDs.indexOf(listID);
          state.boards.boardsData[boardID].listIDs.splice(index, 1);
          state.lists.status = 'idle';
        })
        .addCase(getList.pending, (state) => {
          state.lists.status = 'loading';
        })
        .addCase(getList.fulfilled, (state, action) => {
          const { cards, ...baseListData } = { ...action.payload }
          const listID = action.payload.id;
          const cardIDs: number[] = [];
          cards.forEach(card => {
            cardIDs.push(card.id);
            state.cards.cardsData[card.id] = card;
          })
          const listData = { ...baseListData, cardIDs }
          state.lists.listsData[listID] = listData;
          state.lists.status = 'idle';
        })
        .addCase(createCard.pending, (state) => {
          state.cards.status = 'loading';
        })
        .addCase(createCard.fulfilled, (state, action) => {
          const listID = action.meta.arg.listId;
          const cardID = action.payload.id;
          const card = action.payload;
          state.cards.cardsData[cardID] = { ...card };
          state.lists.listsData[listID].cardIDs.push(cardID);
          state.cards.status = 'idle';
        })
        .addCase(updateCard.pending, (state) => {
          state.cards.status = 'loading';
        })
        .addCase(updateCard.fulfilled, (state, action) => {
          const cardID = action.meta.arg.id;
          const updateData = action.meta.arg.updateData;
          let cardData = state.cards.cardsData[cardID];
          cardData = { ...cardData, ...updateData };
          state.cards.cardsData[cardID] = cardData;
          state.cards.status = 'idle';
        })
        .addCase(deleteCard.pending, (state) => {
          state.cards.status = 'loading';
        })
        .addCase(deleteCard.fulfilled, (state, action) => {
          const cardID = action.meta.arg.id;
          const listID = state.cards.cardsData[cardID].listId;
          delete state.cards.cardsData[cardID];
          const index = state.lists.listsData[listID].cardIDs.indexOf(cardID);
          state.lists.listsData[listID].cardIDs.splice(index, 1);
          state.cards.status = 'idle';
        })
        .addCase(getCard.pending, (state) => {
          state.cards.status = 'loading';
        })
        .addCase(getCard.fulfilled, (state, action) => {
          const cardID = action.payload.id;
          let card = state.cards.cardsData[cardID]
          card = action.payload;
          state.lists.listsData[card.listId].cardIDs.push(cardID);
          state.cards.status = 'idle';
        })
        .addCase(changeListOrder.fulfilled, (state, action) => {
          const boardID = action.meta.arg.boardID;
          const listIDs = action.meta.arg.listIDs;
          state.boards.boardsData[boardID].listIDs = listIDs;
        })
        .addCase(changeCardOrder.fulfilled, (state, action) => {
          const listID = action.meta.arg.listID;
          const cardIDs = action.meta.arg.cardIDs;
          state.lists.listsData[listID].cardIDs = cardIDs;
        })
        .addCase(changeCardParentList.fulfilled, (state, action) => {
          const sourceListID = action.meta.arg.sourceListID;
          const sourceCardIDs = action.meta.arg.sourceCardIDs;
          state.lists.listsData[sourceListID].cardIDs = sourceCardIDs;
          const targetListID = action.meta.arg.targetListID;
          const targetCardIDs = action.meta.arg.targetCardIDs;
          state.lists.listsData[targetListID].cardIDs = targetCardIDs;
        })
        .addCase(removeMember.fulfilled, (state, action) => {
          const boardID = action.meta.arg.boardID;
          const memberID = action.meta.arg.memberID;
          const membersData = state.boards.boardsData[boardID].members;
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

export const selectBoards = (state: RootState) => state.appdata.boards;
export const selectBoardsData = (state: RootState) => state.appdata.boards.boardsData;
export const selectBoardIDs = (state: RootState) => state.appdata.boards.boardIDs;
export const selectBoardsStatus = (state: RootState) => state.appdata.boards.status;

export const selectLists = (state: RootState) => state.appdata.lists;
export const selectListsData = (state: RootState) => state.appdata.lists.listsData;
export const selectListsStatus = (state: RootState) => state.appdata.lists.status;

export const selectCards = (state: RootState) => state.appdata.cards;
export const selectCardsData = (state: RootState) => state.appdata.cards.cardsData;
export const selectCardsStatus = (state: RootState) => state.appdata.cards.status;