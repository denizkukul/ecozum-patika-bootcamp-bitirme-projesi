import { LabelOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import Chip from '@mui/material/Chip/Chip';
import Typography from '@mui/material/Typography/Typography'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeLabel } from '../../store/cards/cardActions';
import { Label } from '../../store/cards/cardsReducer';

type LabelsProps = {
  cardID: number
  cardLabels: Label[]
}

export const Labels: React.FC<LabelsProps> = ({ cardID, cardLabels }) => {
  const dispatch = useAppDispatch()

  const handleRemoveLabel = (cardLabelID?: number) => {
    if (cardLabelID) {
      dispatch(removeLabel({ cardID, cardLabelID }))
    }
  }

  return (
    <>
      {
        cardLabels.length > 0 &&
        <Box sx={{ width: '100%', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LabelOutlined color='primary' />
            <Typography color='primary' py={1} ml={1} fontWeight={700}>Labels</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, border: '1px solid lightgray', borderRadius: 1, p: 1.5 }}>
            {
              cardLabels.map(label =>
                <Chip
                  onDelete={() => handleRemoveLabel(label.CardLabel.id)}
                  key={label.CardLabel.id}
                  label={label.title}
                  color='primary'
                  sx={{ color: 'white', bgcolor: label.color }}
                />)
            }
          </Box>
        </Box>
      }
    </>
  )
}
