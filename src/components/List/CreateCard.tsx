import { Add } from '@mui/icons-material'
import { Button, Popover, TextField } from '@mui/material'
import Box from '@mui/material/Box/Box'
import { useRef, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useForm } from '../../hooks/useForm'
import { createCard } from '../../store/cards/cardActions'
import { createCardButtonStyle, createCardStyle } from './List.styles'

type CreateCardProps = {
  listID: number
}

export const CreateCard: React.FC<CreateCardProps> = ({ listID }) => {
  const list = useAppSelector(state => state.app.lists[listID]);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { formValues, updateFormValues, clearFormValues } = useForm({ title: '' });
  const createCardRef = useRef<null | HTMLElement>(null);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
    clearFormValues();
  }

  const handleCreateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    dispatch(createCard({ data: { title: formValues.title || 'Nameless Card', listId: list.id, order: list.cardIDs.length } }))
    clearFormValues();
  }

  return (
    <Box ref={createCardRef} mt='auto' borderTop='1px solid lightgray'>
      <Button
        sx={{ py: 2 }}
        startIcon={<Add sx={{ pb: '1px' }} />}
        fullWidth
        size='large'
        onClick={handleClick}
      >
        New Card
      </Button>
      <Popover
        open={open}
        anchorEl={createCardRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        elevation={0}
        sx={{ '.MuiPaper-root': { borderRadius: '0 0 4px 4px' } }}
      >
        <Box component='form' sx={createCardStyle} onSubmit={handleCreateCard}>
          <TextField autoFocus sx={{ bgcolor: 'white' }} name='title' placeholder='Card Title' value={formValues.title} onChange={updateFormValues} />
          <Button type='submit' sx={createCardButtonStyle}>Create</Button>
        </Box>
      </Popover >
    </Box>
  )
}