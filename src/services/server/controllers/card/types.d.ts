import { NestedCommentResponse } from '../comment';
import { NestedLabelResponse } from '../label';
import { NestedChecklistResponse } from '../checklist';


export type CardResponse = {
  id: number
  title: string
  listId: number
  updatedAt: string
  createdAt: string
}

export type NestedCardResponse = CardResponse & {
  order: number
  description?: string
  duedate?: string
  labels: NestedLabelResponse[]
  checklists: NestedChecklistResponse[]
  comments: NestedCommentResponse[]
}

export type CreateCardRequest = {
  title: string
  listId: number
  order: number
  description?: string
  duedate?: string
}

export type UpdateCardRequest = {
  title?: string
  duedate?: string
  description?: string
  order?: number
  listId?: number
}