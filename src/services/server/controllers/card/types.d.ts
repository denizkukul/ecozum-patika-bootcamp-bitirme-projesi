export type CardResponse = {
  id: number
  title: string
  listId: number
  updatedAt: string
  createdAt: string
}

type OptionalCardProperties = {
  order?: number
  description?: string
  duedate?: string
  labels?: string[]
  checklists?: string[]
  comments?: string[]
}

export type NestedCardResponse = CardResponse & {
  order?: number
  description?: string
  duedate?: string
  labels?: string[]
  checklists?: string[]
  comments?: string[]
}

export type CreateCardRequest = Pick<CardResponse, 'title' | 'listId'>
export type UpdateCardRequest = OptionalCardProperties & {
  title?: string
  listId?: number
}