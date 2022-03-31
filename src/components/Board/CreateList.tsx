import { Add } from '@mui/icons-material'
import { Button, Popover, TextField } from '@mui/material'
import Box from '@mui/material/Box/Box'
import { useRef, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useForm } from '../../hooks/useForm'
import { createList } from '../../store/lists/listActions'
import { createListButtonStyle, createListStyle, newListButtonStyle } from './Board.style'

type CreateListProps = {
  boardID: number
}

export const CreateList: React.FC<CreateListProps> = ({ boardID }) => {
  const board = useAppSelector(state => state.app.boards[boardID]);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { formValues, updateFormValues, clearFormValues } = useForm({ title: '' });
  const createListRef = useRef<null | HTMLElement>(null);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
    clearFormValues();
  }

  const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    dispatch(createList({ data: { title: formValues.title || 'Nameless List', boardId: boardID, order: board.listIDs.length } }))
    clearFormValues();
  }

  return (
    <Box ref={createListRef}>
      <Button
        sx={newListButtonStyle}
        startIcon={<Add sx={{ pb: '1px' }} />}
        fullWidth
        size='large'
        onClick={handleClick}
      >
        New List
      </Button>
      <Popover
        open={open}
        anchorEl={createListRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        elevation={0}
        sx={{ '.MuiPaper-root': { borderRadius: '4px', bgcolor: 'secondary.main' } }}
      >
        <Box component='form' sx={createListStyle} onSubmit={handleCreateList}>
          <TextField autoFocus sx={{ bgcolor: 'white' }} name='title' placeholder='List Title' value={formValues.title} onChange={updateFormValues} />
          <Button type='submit' sx={createListButtonStyle}>Create</Button>
        </Box>
      </Popover >
    </Box>
  )
}