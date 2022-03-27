import { NestedListResponse } from "../list";
import { Member, NestedMemberResponse } from "../member";

export type BoardResponse = {
  id: number
  ownerId: number
  title: string
  updatedAt: string
  createdAt: string
}

export type BoardListResponse = BoardResponse & {
  members: NestedMemberResponse[]
}

export type BoardOwner = {
  id: number
  username: string
  createdAt: string
  updatedAt: string
}

export type NestedBoardResponse = BoardResponse & {
  owner: BoardOwner
  lists: NestedListResponse[]
  members: NestedMemberResponse[]
}

export type BoardRequest = {
  title: string
  member?: number[]
}