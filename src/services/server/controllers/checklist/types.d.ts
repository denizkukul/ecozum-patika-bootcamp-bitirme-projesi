import { ChecklistItemResponse } from "../checklistitem"
export type ChecklistResponse = {
  id: number
  cardId: number
  title: string
  updatedAt: string
  createdAt: string
}

export type NestedChecklistResponse = ChecklistResponse & {
  items: ChecklistItemResponse[]
}

export type CreateChecklistRequest = {
  cardId: number
  title: string
}

export type UpdateChecklistRequest = {
  title: string
}

