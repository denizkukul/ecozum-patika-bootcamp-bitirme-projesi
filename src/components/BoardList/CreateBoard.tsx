import { Button, Popover, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useForm } from '../../hooks/useForm'
import { createBoard } from '../../store/boards/boardActions'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { buttonIconStyle, buttonInnerContStyle, buttonStyle, buttonTextContStyle, buttonTextStyle, formInnerContStyle, formStyle, formTitleContStyle, formTitleStyle, iconContStyle, inputContainerStyle, inputStyle } from './BoardList.style'

export const CreateBoard: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { formValues, updateFormValues, clearFormValues } = useForm({ title: '' });
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearFormValues();
  };

  const handleCreateBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    dispatch(createBoard({ data: { title: formValues.title || 'Nameless Board' } }))
    clearFormValues();
  }

  return (
    <Box >
      <Button sx={buttonStyle} disableRipple onClick={handleClick}>
        <Box sx={buttonInnerContStyle}>
          <Box sx={iconContStyle}>
            <AddCircleRoundedIcon sx={buttonIconStyle} />
          </Box>
          <Box sx={buttonTextContStyle}>
            <Typography sx={buttonTextStyle}>Create New Board</Typography>
          </Box>
        </Box>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        elevation={0}
        sx={{ '.MuiPaper-root': { borderRadius: '20px' } }}
      >
        <Box component='form' onSubmit={handleCreateBoard} sx={formStyle}>
          <Box sx={formInnerContStyle}>
            <Box sx={formTitleContStyle}>
              <Typography sx={formTitleStyle}>Create New Board</Typography>
            </Box>
            <Box sx={inputContainerStyle}>
              <TextField autoFocus sx={inputStyle} name='title' placeholder='Board Name' value={formValues.title} onChange={updateFormValues} />
              <Button type='submit' >Create</Button>
            </Box>
          </Box>
        </Box>
      </Popover >
    </Box>
  )
}