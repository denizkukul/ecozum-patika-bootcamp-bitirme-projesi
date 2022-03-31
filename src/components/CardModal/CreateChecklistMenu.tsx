import { CheckBoxOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Button, IconButton, Popover, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import { createChecklist } from '../../store/checklists/checklistActions';
import { cListFormContStyle, cListFormInnerContStyle, cListFormStyle } from './CardModal.style';

type CreateChecklistProps = {
  cardID: number
}

export const CreateChecklist: React.FC<CreateChecklistProps> = ({ cardID }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { formValues, updateFormValues, clearFormValues } = useForm({ checklistTitle: '' });

  const handleAddChecklist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createChecklist({ data: { cardId: cardID, title: formValues.checklistTitle || 'Nameless Checklist' } }))
    handleClose();
    clearFormValues();
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        color='secondary'
      >
        <CheckBoxOutlined />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        sx={{ mt: 1 }}
      >
        <Box component='form' onSubmit={handleAddChecklist} sx={cListFormStyle}>
          <Box sx={cListFormContStyle}>
            <Box sx={cListFormInnerContStyle}>
              <TextField
                autoFocus
                sx={{ width: '80%', my: 2 }}
                name='checklistTitle'
                placeholder='Checklist Title'
                value={formValues.checklistTitle}
                onChange={updateFormValues}
              />
              <Button type='submit' sx={{ mb: 2 }} >Create Checklist</Button>
            </Box>
          </Box>
        </Box>
      </Popover >
    </Box >
  );
}
