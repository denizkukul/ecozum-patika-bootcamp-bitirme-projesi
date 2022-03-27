import { Delete } from "@mui/icons-material"
import Box from "@mui/material/Box/Box"
import Button from "@mui/material/Button/Button"
import Checkbox from "@mui/material/Checkbox/Checkbox"
import IconButton from "@mui/material/IconButton/IconButton"
import LinearProgress from "@mui/material/LinearProgress/LinearProgress"
import TextField from "@mui/material/TextField/TextField"
import Typography from "@mui/material/Typography/Typography"
import { useState } from "react"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { Checklist as ChecklistProps } from "../store/checklists/checklistsReducer"
import { createChecklistItem, deleteChecklist, deleteChecklistItem, updateChecklistItem } from "../store/checklists/checklistActions"

type Props = {
  checklistID: number
}

export const Checklist: React.FC<Props> = ({ checklistID }) => {
  const checklist = useAppSelector(state => state.app.checklists[checklistID]);
  const [newItem, setNewItem] = useState('');
  const dispatch = useAppDispatch();

  const handleCreateChecklistItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createChecklistItem({ data: { checklistId: checklist.id, title: newItem, isChecked: false } }));
    setNewItem('');
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

  const getProgress = () => {
    let completed = 0;
    checklist.items.forEach(item => item.isChecked && completed++);
    if (completed === 0) return 0
    else return (completed) / (checklist.items.length) * 100
  }

  return (
    <Box bgcolor='whitesmoke' borderRadius='10px' key={checklist.id} my={3}>
      <Box display='flex' justifyContent='space-between'>
        <Typography color='primary' p={1} fontWeight={500}>{checklist.title}</Typography>
        <IconButton onClick={() => handleDeleteChecklist(checklist.id)}><Delete /></IconButton>
      </Box>
      <LinearProgress variant="determinate" value={getProgress()} />
      <Box>
        {
          checklist.items?.map(item => {
            return (
              <Box display='flex' key={item.id}>
                <Checkbox checked={item.isChecked} onChange={(e) => handleUpdateListItem(item.id, e.target.checked)} />
                <Typography p={1} fontWeight={500}>{item.title}</Typography>
                <IconButton onClick={() => handleDeleteChecklistItem(item.id)}><Delete /></IconButton>
              </Box>
            )
          })
        }
      </Box>
      <Box p={2} my={2} component='form' sx={{ display: 'flex', alignItems: 'center' }} onSubmit={handleCreateChecklistItem}>
        <TextField type="text" value={newItem} placeholder="Item name" onChange={e => setNewItem(e.target.value)} />
        <Button type='submit' sx={{ flex: 1, marginLeft: 2 }}>Create Item</Button>
      </Box>
    </Box>
  )
}
