export type LabelResponse = {
  id: number
  cardId: number
  labelId: number
  updatedAt: string
  createdAt: string
}

export type AddLabelRequest = {
  cardId: number
  labelId: number
}

export type LabelOptionResponse = {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
}