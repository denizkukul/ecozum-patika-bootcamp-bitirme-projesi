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
import { Checklist as ChecklistData } from "../services/server/controllers/card/types"
import { addChecklistItem, removeChecklistItem, updateChecklistItem } from "../store/appdataSlice"

type ChecklistProps = {
  checklist: ChecklistData
  cardID: number
  handleDeleteChecklist: (checklistID: number) => void
}

export const Checklist: React.FC<ChecklistProps> = ({ checklist, handleDeleteChecklist, cardID }) => {
  const [newItem, setNewItem] = useState('');
  const dispatch = useAppDispatch();

  const handleCreateChecklistItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addChecklistItem({ cardID, checklistID: checklist.id, payload: { checklistId: checklist.id, title: newItem, isChecked: false } }));
    setNewItem('');
  }

  const handleDeleteChecklistItem = (id: number) => {
    dispatch(removeChecklistItem({ cardID, checklistID: checklist.id, checklistItemID: id }));
  }

  const handleUpdateListItem = (id: number, isChecked: boolean) => {
    dispatch(updateChecklistItem({ cardID, checklistID: checklist.id, checklistItemID: id, payload: { isChecked } }))
  }

  const getProgress = () => {
    let completed = 0;
    checklist.items.forEach(item => item.isChecked && completed++);
    if (completed === 0) return 0
    else return (completed) / (checklist.items.length) * 100
  }

  console.log(getProgress());

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
