import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';
import { Box, IconButton, Menu } from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteList } from '../../store/lists/listActions';
import { ListEdit } from './ListEdit';

type ListMenuProps = {
  listID: number
  startEdit: () => void
}

export const ListMenu: React.FC<ListMenuProps> = ({ listID, startEdit }) => {
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

  const handleDeleteList = () => {
    dispatch(deleteList({ listID }));
  }

  return (
    <Box>
      <IconButton onClick={handleClick} color='secondary'>
        <MoreVertRounded sx={{ color: 'white' }} />
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
          <MenuItem onClick={handleDeleteList}>
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
