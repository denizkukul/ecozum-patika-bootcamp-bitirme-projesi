import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Add, CheckBoxOutlined, Delete, Edit, Label, LabelOutlined, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Button, Checkbox, Chip, Icon, IconButton, Menu, Popover, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { addLabel, removeLabel } from '../store/cards/cardActions';
import { useForm } from '../hooks/useForm';
import { createChecklist } from '../store/checklists/checklistActions';

type CreateChecklistMenuProps = {
  cardID: number
}

export const CreateChecklistMenu: React.FC<CreateChecklistMenuProps> = ({ cardID }) => {
  const card = useAppSelector(state => state.app.cards[cardID]);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { formValues, updateFormValues, clearFormValues } = useForm({ defaultValues: { checklistTitle: '' } });

  const handleAddChecklist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createChecklist({ data: { cardId: cardID, title: formValues.checklistTitle } }))
    handleClose();
    clearFormValues();
  }

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'create-checklist' : undefined}
        aria-describedby={open ? "create-checklist" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='secondary'
      >
        <CheckBoxOutlined />
      </IconButton>
      <Popover
        id={open ? "create-checklist" : undefined}
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
        <Box component='form' onSubmit={handleAddChecklist} sx={{ height: 'fit-content', width: '300px', p: 1, backgroundColor: 'white', borderRadius: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ width: '100%', flex: 75, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
              <TextField autoFocus sx={{ width: '80%', my: 2 }} name='checklistTitle' placeholder='Checklist Title' value={formValues.checklistTitle} onChange={updateFormValues} />
              <Button type='submit' sx={{ mb: 2 }} >Create Checklist</Button>
            </Box>
          </Box>
        </Box>
      </Popover >
    </Box >
  );
}
