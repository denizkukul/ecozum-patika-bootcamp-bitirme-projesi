export type CreateChecklistItemRequest = {
  checklistId: number
  title: string
  isChecked: boolean
}

export type UpdateChecklistItemRequest = {
  title?: string
  isChecked?: boolean
}

export type ChecklistItemResponse = {
  id: number
  checklistId: number
  isChecked: boolean
  title: string
  updatedAt: string
  createdAt: string
}
