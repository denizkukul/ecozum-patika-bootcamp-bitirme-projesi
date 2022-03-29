import { Button, ClickAwayListener, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { useRef, useState } from "react";
import { useForm } from "../hooks/useForm";
import { BoardRequest } from "../services/server/controllers/board";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

type CreateBoardFormProps = {
  onSubmit: (formValues: BoardRequest) => void
}

export const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ onSubmit }) => {
  const { formValues, updateFormValues, clearFormValues } = useForm({ defaultValues: { title: '' } });
  const [active, setActive] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setActive(false);
    clearFormValues();
  }

  const handleClickAway = () => {
    setActive(false);
  }

  return (
    <>
      {
        active ?
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box component='form' onSubmit={handleSubmit} sx={{ height: '200px', width: '200px', m: 4, mt: 0, backgroundColor: 'white', borderRadius: '20px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ width: '100%', flex: 25, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Typography color='primary' sx={{ textTransform: 'capitalize', fontFamily: 'Poppins', fontWeight: '600', m: 2, mb: 0 }}>Create New Board</Typography>
                </Box>
                <Box sx={{ width: '100%', flex: 75, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                  <TextField autoFocus sx={{ width: '80%', my: 2 }} name='title' placeholder='Board Name' value={formValues.title} onChange={updateFormValues} />
                  <Button type='submit' >Create</Button>
                </Box>
              </Box>
            </Box>
          </ClickAwayListener> :
          <Button sx={{ height: '200px', width: '200px', m: 4, mt: 0, p: 0, backgroundColor: 'white', borderRadius: '20px', ':hover': { backgroundColor: 'grey.200' } }} disableRipple onClick={() => setActive(true)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
              <Box sx={{ width: '100%', flex: 45, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                <AddCircleRoundedIcon sx={{ height: '50px', width: '50px' }} />
              </Box>
              <Box sx={{ width: '100%', flex: 55, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Typography sx={{ textTransform: 'capitalize', backgroundColor: 'transparent', fontFamily: 'Poppins', fontWeight: '600', m: 2 }}>Create New Board</Typography>
              </Box>
            </Box>
          </Button>
      }
    </>
  )
}