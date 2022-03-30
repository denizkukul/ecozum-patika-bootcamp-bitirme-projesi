import Box from '@mui/material/Box/Box'
import { DeleteOutlined } from '@mui/icons-material'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ChecklistHeader } from './ChecklistHeader'
import { CreateItem } from './CreateItem'
import { ChecklistItem } from './ChecklistItem'

type ChecklistProps = {
  checklistID: number
}

export const Checklist: React.FC<ChecklistProps> = ({ checklistID }) => {
  const checklist = useAppSelector(state => state.app.checklists[checklistID]);

  return (
    <Box key={checklist.id} mb={5}>
      <ChecklistHeader checklist={checklist} />
      <Box sx={{ mt: 1 }}>
        {
          checklist.items?.map(item => {
            return (
              <ChecklistItem checklistID={checklistID} checklistItem={item} />
            )
          })
        }
      </Box>
      <CreateItem checklistID={checklist.id} />
    </Box>
  )
}
