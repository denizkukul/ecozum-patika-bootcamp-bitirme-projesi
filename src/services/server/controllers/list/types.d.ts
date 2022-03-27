import { BoardResponse } from '../board'
import { NestedCardResponse } from '../card'

export type ListResponse = {
  id: number
  order: number
  title: string
  createdAt: string
  updatedAt: string
  boardId: number
  board: BoardResponse
}

export type NestedListResponse = ListResponse & {
  cards: NestedCardResponse[];
}

export type CreateListRequest = {
  title: string
  boardId: number
  order: number
}

export type UpdateListRequest = {
  title?: string
  boardId?: number
  order?: number
}
