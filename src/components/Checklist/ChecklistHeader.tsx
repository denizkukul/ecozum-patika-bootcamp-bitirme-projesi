import { CheckBoxOutlined, DeleteOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import LinearProgress from '@mui/material/LinearProgress/LinearProgress'
import Typography from '@mui/material/Typography/Typography'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { deleteChecklist } from '../../store/checklists/checklistActions'
import { Checklist } from '../../store/checklists/checklistsReducer'
import { progressStyle } from './Checklist.style'

type ChecklistHeaderProps = {
  checklist: Checklist
}

export const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({ checklist }) => {
  const dispatch = useAppDispatch();
  const handleDeleteChecklist = (checklistID: number) => {
    dispatch(deleteChecklist({ checklistID }))
  }

  let completed = 0;
  const total = checklist.items.length;
  let progress = 0;

  checklist.items.forEach(item => item.isChecked && completed++);
  if (completed === 0) progress = 0;
  else progress = (completed) / (checklist.items.length) * 100

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CheckBoxOutlined color='primary' />
        <Typography color='primary' py={1} ml={1} fontWeight={700}>{checklist.title}</Typography>
        <IconButton sx={{ ml: 'auto' }} onClick={() => handleDeleteChecklist(checklist.id)}><DeleteOutlined /></IconButton>
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography sx={progressStyle}>{`${completed}/${total}`}</Typography>
        <LinearProgress sx={{ flex: 1, ml: 1 }} variant='determinate' value={progress} />
      </Box>
    </>
  )
}
