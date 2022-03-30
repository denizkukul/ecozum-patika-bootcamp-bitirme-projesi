import Box from '@mui/material/Box/Box'
import { Checklist } from '../Checklist/Checklist'

type ChecklistsProps = {
  checklistIDs: number[]
}

export const Checklists: React.FC<ChecklistsProps> = ({ checklistIDs }) => {
  return (
    <Box width='100%' mb={3}>
      {
        checklistIDs.map(checklistID => {
          return (
            <Checklist key={checklistID} checklistID={checklistID} />
          )
        })
      }
    </Box>
  )
}
