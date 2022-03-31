import { CheckBoxOutlined, DeleteOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import LinearProgress from '@mui/material/LinearProgress/LinearProgress'
import Typography from '@mui/material/Typography/Typography'
import { useRef, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { deleteChecklist, updateChecklist } from '../../store/checklists/checklistActions'
import { Checklist } from '../../store/checklists/checklistsReducer'
import { progressStyle } from './Checklist.style'
import { ChecklistEdit } from './ChecklistEdit'
import { ChecklistMenu } from './ChecklistMenu'

type ChecklistHeaderProps = {
  checklist: Checklist
}

export const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({ checklist }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const headerRef = useRef<null | HTMLElement>(null);

  const handleDeleteChecklist = (checklistID: number) => {
    dispatch(deleteChecklist({ checklistID }))
  }

  const startEdit = () => {
    setEditing(true);
  }

  const saveEdit = (value: string) => {
    dispatch(updateChecklist({ checklistID: checklist.id, data: { title: value } }));
    setEditing(false);
  }

  const cancelEdit = () => {
    setEditing(false);
  }

  let completed = 0;
  const total = checklist.items.length;
  let progress = 0;

  checklist.items.forEach(item => item.isChecked && completed++);
  if (completed === 0) progress = 0;
  else progress = (completed) / (checklist.items.length) * 100

  return (
    <>
      <Box ref={headerRef} sx={{ display: 'flex', alignItems: 'center' }}>
        <ChecklistEdit title={checklist.title} open={editing} anchor={headerRef.current!} saveEdit={saveEdit} cancelEdit={cancelEdit} />
        <CheckBoxOutlined color='primary' />
        <Typography color='primary' py={1} ml={1} fontWeight={700}>{checklist.title}</Typography>
        <ChecklistMenu checklistID={checklist.id} startEdit={startEdit} />
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography sx={progressStyle}>{`${completed}/${total}`}</Typography>
        <LinearProgress sx={{ flex: 1, ml: 1 }} variant='determinate' value={progress} />
      </Box>
    </>
  )
}
