import { DeleteOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import Typography from '@mui/material/Typography/Typography'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { deleteChecklistItem, updateChecklistItem } from '../../store/checklists/checklistActions'
import { ChecklistItem as ChecklistItemType } from '../../store/checklists/checklistsReducer'
import { itemStyle } from './Checklist.style'

type ChecklistItemProps = {
  checklistID: number
  checklistItem: ChecklistItemType
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ checklistID, checklistItem }) => {
  const dispatch = useAppDispatch();

  const handleDeleteChecklistItem = (checklistItemID: number) => {
    dispatch(deleteChecklistItem({ checklistID, checklistItemID }));
  }

  const handleUpdateListItem = (checklistItemID: number, isChecked: boolean) => {
    dispatch(updateChecklistItem({ checklistID, checklistItemID, data: { isChecked } }))
  }

  return (
    <Box display='flex' sx={{ py: 1, position: 'relative', alignItems: 'center' }} key={checklistItem.id}>
      <Checkbox sx={{ mr: 1, flex: '42px 0 0' }} checked={checklistItem.isChecked} onChange={(e) => handleUpdateListItem(checklistItem.id, e.target.checked)} />
      <Typography sx={itemStyle} p={1} fontWeight={500}>{checklistItem.title}</Typography>
      <IconButton sx={{ flex: '42px 0 0', marginLeft: 2 }} onClick={() => handleDeleteChecklistItem(checklistItem.id)}><DeleteOutlined /></IconButton>
    </Box>
  )
}
