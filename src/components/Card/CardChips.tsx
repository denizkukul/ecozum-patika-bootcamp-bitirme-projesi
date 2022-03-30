import Box from '@mui/material/Box/Box'
import { ChecklistChip, DuedateChip } from './Chips'

type CardChipsProps = {
  duedate?: string
  checklistIDs: number[]
}

export const CardChips: React.FC<CardChipsProps> = ({ duedate, checklistIDs }) => {
  return (
    <Box sx={{ mt: 1 }}>
      {
        duedate &&
        <DuedateChip duedate={duedate} />
      }
      {
        checklistIDs.map(checklistID => {
          return (
            <ChecklistChip key={checklistID} checklistID={checklistID} />
          )
        })
      }
    </Box>
  )
}
