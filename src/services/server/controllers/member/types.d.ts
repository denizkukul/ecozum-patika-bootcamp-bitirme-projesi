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