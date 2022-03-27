export type MemberResponse = {
  id: number
  boardId: number
  userId: number
  updatedAt: string
  createdAt: string
}

export type NestedMemberResponse = {
  id: number
  username: string
  createdAt: string
  updatedAt: string
  BoardMember: MemberResponse
}

export type MemberRequest = {
  boardId: number
  username: string
}

export type MemberListResponse = {
  id: number
  createdAt: string
  updatedAt: string
  boardId: number
  userId: number
  board: {
    id: number
    title: string
    createdAt: string
    updatedAt: string
    ownerId: number
  },
  user: {
    id: number
    username: string
    createdAt: string
    updatedAt: string
  }
}