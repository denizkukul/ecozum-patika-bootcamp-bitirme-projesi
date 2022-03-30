import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Delete, Edit, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Divider, IconButton, Menu } from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteBoard } from '../../store/boards/boardActions';
import { logout } from '../../store/auth/authActions';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useAppSelector } from '../../hooks/useAppSelector';
import { MembersModal } from '../MembersModal/MembersModal';


type BoardMenuProps = {
  boardID: number
  openMembersModal: () => void
  startEdit: () => void
}

export const BoardMenu: React.FC<BoardMenuProps> = ({ boardID, openMembersModal, startEdit }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const board = useAppSelector(state => state.app.boards[boardID]);
  const userID = useAppSelector(state => state.auth.userID);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard({ boardID }));
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleOpenMemberModal = () => {
    openMembersModal();
    handleClose();
  }

  const handleStartEdit = () => {
    startEdit();
    handleClose();
  }

  return (
    <Box position='relative'>
      <IconButton
        onClick={handleClick}
        color='secondary'
      >
        <MoreVertRounded sx={{ color: 'primary.contrastText' }} />
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
          <MenuItem onClick={handleOpenMemberModal}>
            <ListItemIcon>
              <GroupOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Members</ListItemText>
          </MenuItem>
          {
            board.ownerId === userID &&
            <MenuItem onClick={handleDeleteBoard}>
              <ListItemIcon>
                <Delete fontSize='small' />
              </ListItemIcon>
              <ListItemText>Delete Board</ListItemText>
            </MenuItem>
          }
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
