import { AddOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField/TextField'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { createChecklistItem } from '../../store/checklists/checklistActions'

type CreateItemProps = {
  checklistID: number
}

export const CreateItem: React.FC<CreateItemProps> = ({ checklistID }) => {
  const [newItemTitle, setNewItemTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleCreateChecklistItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createChecklistItem({ data: { checklistId: checklistID, title: newItemTitle || 'Nameless Checklist Item', isChecked: false } }));
    setNewItemTitle('');
  }

  return (
    <Box py={1} pl='56px' component='form' sx={{ display: 'flex' }} onSubmit={handleCreateChecklistItem}>
      <TextField sx={{ flex: '0px 1 0', ml: 1 }} type='text' value={newItemTitle} placeholder='Item name' onChange={e => setNewItemTitle(e.target.value)} />
      <IconButton type='submit' sx={{ bgcolor: 'secondary.main', flex: '56px 0 0', marginLeft: 2 }}>
        <AddOutlined />
      </IconButton>
    </Box>
  )
}
