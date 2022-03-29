import { Add, AddOutlined, CheckBoxOutlined, Delete, DeleteOutlined } from "@mui/icons-material"
import Box from "@mui/material/Box/Box"
import Button from "@mui/material/Button/Button"
import Checkbox from "@mui/material/Checkbox/Checkbox"
import IconButton from "@mui/material/IconButton/IconButton"
import LinearProgress from "@mui/material/LinearProgress/LinearProgress"
import TextField from "@mui/material/TextField/TextField"
import Typography from "@mui/material/Typography/Typography"
import { useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { createChecklistItem, deleteChecklist, deleteChecklistItem, updateChecklistItem } from "../../store/checklists/checklistActions"

type Props = {
  checklistID: number
}

export const Checklist: React.FC<Props> = ({ checklistID }) => {
  const checklist = useAppSelector(state => state.app.checklists[checklistID]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleCreateChecklistItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createChecklistItem({ data: { checklistId: checklist.id, title: newItemTitle, isChecked: false } }));
    setNewItemTitle('');
  }

  const handleDeleteChecklistItem = (checklistItemID: number) => {
    dispatch(deleteChecklistItem({ checklistID: checklist.id, checklistItemID }));
  }

  const handleUpdateListItem = (checklistItemID: number, isChecked: boolean) => {
    dispatch(updateChecklistItem({ checklistID: checklist.id, checklistItemID, data: { isChecked } }))
  }

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
    <Box key={checklist.id} mb={5}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CheckBoxOutlined color='primary' />
        <Typography color='primary' py={1} ml={1} fontWeight={700}>{checklist.title}</Typography>
        <IconButton sx={{ ml: 'auto' }} onClick={() => handleDeleteChecklist(checklist.id)}><DeleteOutlined /></IconButton>
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography fontWeight='600' color='primary.main' letterSpacing='2px' sx={{ pl: 0.5 }}>{`${completed}/${total}`}</Typography>
        <LinearProgress sx={{ flex: 1, ml: 1 }} variant="determinate" value={progress} />
      </Box>
      <Box sx={{ mt: 1 }}>
        {
          checklist.items?.map(item => {
            return (
              <Box display='flex' sx={{ py: 1 }} key={item.id}>
                <Checkbox sx={{ mr: 1 }} checked={item.isChecked} onChange={(e) => handleUpdateListItem(item.id, e.target.checked)} />
                <Typography sx={{ p: '16.5px 14px', width: '100%', borderRadius: '5px', border: '1px solid lightgray' }} p={1} fontWeight={500}>{item.title}</Typography>
                <IconButton sx={{ flex: '56px 0 0', marginLeft: 2 }} onClick={() => handleDeleteChecklistItem(item.id)}><DeleteOutlined /></IconButton>
              </Box>
            )
          })
        }
      </Box>
      <Box py={1} pl='42px' component='form' sx={{ display: 'flex' }} onSubmit={handleCreateChecklistItem}>
        <TextField sx={{ flex: '0px 1 0', ml: 1 }} type="text" value={newItemTitle} placeholder="Item name" onChange={e => setNewItemTitle(e.target.value)} />
        <IconButton type='submit' sx={{ bgcolor: 'secondary.main', flex: '56px 0 0', marginLeft: 2 }}>
          <AddOutlined />
        </IconButton>
      </Box>
    </Box>
  )
}
