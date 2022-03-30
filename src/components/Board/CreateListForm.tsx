import { Button, ClickAwayListener, TextField } from '@mui/material'
import Box from '@mui/material/Box/Box'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Card as MuiCard } from '@mui/material'
import { Add } from '@mui/icons-material'

type CreateListFormProps = {
  onSubmit: (formValues: { title: string }) => void
}

export const CreateListForm: React.FC<CreateListFormProps> = ({ onSubmit }) => {
  const { formValues, updateFormValues, clearFormValues } = useForm({ title: '' });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    clearFormValues();
    setOpen(false);
  }

  const handleClick = () => {
    setOpen(true);
  }
  const handleClickAway = () => {
    setOpen(false);
  }

  return (
    <MuiCard sx={{ bgcolor: 'secondary.main', height: 'fit-content', flex: '350px 0 0' }}>
      {
        open ?
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box component='form' sx={{ display: 'flex', p: 2, alignItems: 'center' }} onSubmit={handleSubmit}>
              <TextField autoFocus sx={{ width: '70%', bgcolor: 'white' }} name='title' placeholder='List Title' value={formValues.title} onChange={updateFormValues} />
              <Button type='submit' sx={{ height: '56px', flex: 1, marginLeft: 2, bgcolor: 'white' }}>Add</Button>
            </Box>
          </ClickAwayListener>
          :
          <Button
            sx={{ py: 2, minHeight: '64px' }}
            startIcon={<Add sx={{ pb: '1px' }} />}
            fullWidth
            size='large'
            onClick={handleClick}
          >
            Create List
          </Button>
      }
    </MuiCard >
  )
}
