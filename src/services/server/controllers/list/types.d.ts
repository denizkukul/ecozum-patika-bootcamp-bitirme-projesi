import { BoardResponse } from "../board"
import { NestedCardResponse } from "../card"

export type ListResponse = {
  id: number
  order?: number
  title: string
  createdAt: string
  updatedAt: string
  boardId: number
  board: BoardResponse
}

export type NestedListResponse = ListResponse & {
  cards: NestedCardResponse[];
}

export type CreateListRequest = Pick<ListResponse, 'title' | 'boardId'>
export type UpdateListRequest = {
  id?: number
  order?: number
  title?: string
}
