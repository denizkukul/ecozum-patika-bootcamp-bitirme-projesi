import { type } from 'os';
import { NestedChecklistResponse } from '../checklist/types';
import { Comment } from '../comment';

export type CardResponse = {
  id: number
  title: string
  listId: number
  updatedAt: string
  createdAt: string
}

export type CardLabel = {
  id: number
  labelID: number
}

export type ChecklistItem = {
  id: number
  isChecked: boolean
  title: string
}

export type Checklist = {
  id: number
  title: string
  items: ChecklistItem[]
}

type OptionalCardProperties = {
  order?: number
  description?: string
  duedate?: string
  labels?: CardLabel[]
  checklists?: Checklist[]
  comments?: Comment[]
}

type NestedCardResponseLabels = {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  CardLabel: {
    id: number
    createdAt: string
    updatedAt: string
    cardId: number
    labelId: number
  }
}

type NestedCardResponseComments = {
  id: number
  message: string
  createdAt: string
  updatedAt: string
  cardId: number
  authorId: number
  author: {
    id: number
    username: string
    createdAt: string
    updatedAt: string
  }
}

export type NestedCardResponse = CardResponse & {
  order?: number
  description?: string
  duedate?: string
  labels?: NestedCardResponseLabels[]
  checklists?: NestedChecklistResponse[]
  comments?: NestedCardResponseComments[]
}

export type CreateCardRequest = Pick<CardResponse, 'title' | 'listId'>
export type UpdateCardRequest = OptionalCardProperties & {
  title?: string
  listId?: number
}