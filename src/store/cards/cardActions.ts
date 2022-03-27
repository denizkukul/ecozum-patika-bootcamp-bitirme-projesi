import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatCardData } from "../../helpers/formatData";
import cardRequests, { CreateCardRequest, UpdateCardRequest } from "../../services/server/controllers/card";
import commentRequests, { CommentRequest } from "../../services/server/controllers/comment";
import labelRequests, { AddLabelRequest } from "../../services/server/controllers/label";


export const createCard = createAsyncThunk(
  'cardActions/createCard',
  async (arg: { data: CreateCardRequest }) => {
    return cardRequests.create(arg.data).then(response => response.data);
  }
);

export const updateCard = createAsyncThunk(
  'cardActions/updateCard',
  async (arg: { cardID: number, data: UpdateCardRequest }) => {
    return cardRequests.update(arg.cardID, arg.data).then(response => response.data);
  }
);

export const deleteCard = createAsyncThunk(
  'cardActions/deleteCard',
  async (arg: { cardID: number }) => {
    return cardRequests.destroy(arg.cardID).then(response => response.data);
  }
);

export const getCard = createAsyncThunk(
  'cardActions/getCard',
  async (arg: { cardID: number }) => {
    return cardRequests.get(arg.cardID).then(response => response.data)
  }
)

export const addLabel = createAsyncThunk(
  'cardActions/addLabel',
  async (arg: { data: AddLabelRequest }) => {
    return labelRequests.create(arg.data).then(response => response.data);
  }
)

export const removeLabel = createAsyncThunk(
  'cardActions/removeLabel',
  async (arg: { labelID: number, cardID: number }) => {
    return labelRequests.destroy(arg.labelID).then(response => response.data);
  }
)

export const addComment = createAsyncThunk(
  'cardActions/addComment',
  async (arg: { username: string, data: CommentRequest }) => {
    return commentRequests.create(arg.data).then(response => response.data);
  }
)

