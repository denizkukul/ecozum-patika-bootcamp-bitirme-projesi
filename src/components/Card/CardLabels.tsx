import Box from '@mui/material/Box/Box'
import Chip from '@mui/material/Chip/Chip'
import { Label } from '../../store/cards/cardsReducer'

type CardLabelsProps = {
  cardLabels: Label[]
}

export const CardLabels: React.FC<CardLabelsProps> = ({ cardLabels }) => {
  return (
    cardLabels &&
    <Box sx={{ mb: 0.5 }}>
      {
        cardLabels.map(label => {
          return (<Chip key={label.id} sx={{ bgcolor: label.color, width: '32px', height: '8px', mr: 1 }} />)
        })
      }
    </Box>
  )
}