import board, { NestedBoardResponse } from "../services/server/controllers/board";
import { NestedCardResponse } from "../services/server/controllers/card";
import { NestedListResponse } from "../services/server/controllers/list";
import { Card } from "../store/cards/cardsReducer";
import { Checklist } from "../store/checklists/checklistsReducer";
import { List } from "../store/lists/listsReducer";

export const formatBoardData = (nestedBoardData: NestedBoardResponse) => {
  const { lists, ...baseBoardData } = { ...nestedBoardData }

  const listsData: { [key: number]: List } = {};
  const cardsData: { [key: number]: Card } = {};
  const checklistsData: { [key: number]: Checklist } = {};

  const listIDs: number[] = [];
  lists.forEach(nestedListData => {
    listIDs.push(nestedListData.id);
    const { cards, ...baseListData } = { ...nestedListData };
    const cardIDs: number[] = [];
    cards.forEach(nestedCardData => {
      cardIDs.push(nestedCardData.id);
      const { checklists, ...baseCardData } = { ...nestedCardData };
      const checklistIDs: number[] = [];
      checklists.forEach(checklistData => {
        checklistIDs.push(checklistData.id);
        checklistsData[checklistData.id] = checklistData;
      })
      cardsData[baseCardData.id] = { checklistIDs, ...baseCardData }
    })
    listsData[baseListData.id] = { cardIDs, ...baseListData }
  })
  const boardData = { [baseBoardData.id]: { listIDs, ...baseBoardData } };
  return { boardData, listsData, cardsData, checklistsData };
}

export const formatListData = (nestedListData: NestedListResponse) => {

  const cardsData: { [key: number]: Card } = {};
  const checklistsData: { [key: number]: Checklist } = {};

  const { cards, ...baseListData } = { ...nestedListData };
  const cardIDs: number[] = [];
  cards.forEach(nestedCardData => {
    cardIDs.push(nestedCardData.id);
    const { checklists, ...baseCardData } = { ...nestedCardData };
    const checklistIDs: number[] = [];
    checklists.forEach(checklistData => {
      checklistIDs.push(checklistData.id);
      checklistsData[checklistData.id] = checklistData;
    })
    cardsData[baseCardData.id] = { checklistIDs, ...baseCardData }
  })
  const listData = { [baseListData.id]: { cardIDs, ...baseListData } };
  return { listData, cardsData, checklistsData };
}

export const formatCardData = (nestedCardData: NestedCardResponse) => {

  const checklistsData: { [key: number]: Checklist } = {};
  const { checklists, ...baseCardData } = { ...nestedCardData };
  const checklistIDs: number[] = [];
  checklists.forEach(checklistData => {
    checklistIDs.push(checklistData.id);
    checklistsData[checklistData.id] = checklistData;
  })
  const cardData = { [baseCardData.id]: { checklistIDs, ...baseCardData } }
  return { cardData, checklistsData };
}

