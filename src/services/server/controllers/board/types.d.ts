import { NestedListResponse } from "../list";
import { Member } from "../member";

export type BoardResponse = {
  id: number
  ownerId: number
  title: string
  updatedAt: string
  createdAt: string
}

export type NestedBoardResponse = BoardResponse & {
  owner: {
    id: number
    username: string
    createdAt: string
    updatedAt: string
  }
  lists: NestedListResponse[]
  members: Member[]
}

export type BoardRequest = Pick<Board, 'title'>