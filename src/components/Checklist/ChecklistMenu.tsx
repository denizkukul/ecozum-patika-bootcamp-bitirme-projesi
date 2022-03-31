import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';
import { Box, IconButton, Menu } from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteChecklist } from '../../store/checklists/checklistActions';

type ChecklistMenuProps = {
  checklistID: number
  startEdit: () => void
}

export const ChecklistMenu: React.FC<ChecklistMenuProps> = ({ checklistID, startEdit }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStartEdit = () => {
    startEdit();
    handleClose()
  }

  const handleDeleteChecklist = () => {
    dispatch(deleteChecklist({ checklistID }));
  }

  return (
    <Box sx={{ ml: 'auto' }}>
      <IconButton onClick={handleClick} color='primary'>
        <MoreVertRounded />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          <MenuItem onClick={handleStartEdit}>
            <ListItemIcon>
              <Edit fontSize='small' />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteChecklist}>
            <ListItemIcon>
              <Delete fontSize='small' />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
