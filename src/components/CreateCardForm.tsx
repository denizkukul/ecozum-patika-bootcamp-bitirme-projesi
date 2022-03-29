import { Add } from "@mui/icons-material"
import { Button, ClickAwayListener, TextField } from "@mui/material"
import Box from "@mui/material/Box/Box"
import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { CreateCardRequest } from "../services/server/controllers/card"

type CreateCardFormProps = {
  onSubmit: (formValues: { title: string }) => void
}

export const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const { formValues, updateFormValues, clearFormValues } = useForm({ defaultValues: { title: '' } });

  const handleClick = () => {
    setOpen(true);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setOpen(false);
    clearFormValues();
  }

  const handleClickAway = () => {
    setOpen(false);
  }

  return (
    <>
      {
        open ?
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box component='form' sx={{ display: 'flex', p: 2, alignItems: 'center' }} onSubmit={handleSubmit}>
              <TextField autoFocus sx={{ width: '70%', bgcolor: 'white' }} name='title' placeholder='Card Title' value={formValues.title} onChange={updateFormValues} />
              <Button type='submit' sx={{ height: '56px', flex: 1, marginLeft: 2, bgcolor: 'white' }}>Add</Button>
            </Box>
          </ClickAwayListener>
          :
          <Button
            sx={{ py: 2 }}
            startIcon={<Add sx={{ pb: '1px' }} />}
            fullWidth
            size="large"
            onClick={handleClick}
          >
            Create Card
          </Button>
      }
    </>
  )
}
