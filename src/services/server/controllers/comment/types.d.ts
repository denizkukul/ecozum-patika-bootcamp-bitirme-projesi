export type CommentResponse = {
  id: number
  cardId: number
  message: string
  authorId: number
  updatedAt: string
  createdAt: string
}

export type NestedCommentResponse = {
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

export type CommentRequest = {
  cardId: number
  message: string
}