export type BoardMember = {
  BoardMember: {
    id: number
    createdAt: string
    updatedAt: string
    boardId: number
    userId: number
  }
}

export type Member = BoardMember & {
  id: number,
  username: string
  createdAt: string
  updatedAt: string
}

export type MemberRequest = {
  boardId: number
  username: string
}