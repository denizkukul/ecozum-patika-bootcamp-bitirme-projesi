export type LabelResponse = {
  id: number
  cardId: number
  labelId: number
  updatedAt: string
  createdAt: string
}

export type LabelTypeResponse = {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
}

export type NestedLabelResponse = {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  CardLabel: {
    id: number
    createdAt: string
    updatedAt: string
    cardId: number
    labelId: number
  }
}

export type AddLabelRequest = {
  cardId: number
  labelId: number
}