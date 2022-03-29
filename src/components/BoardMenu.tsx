import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Close, Delete, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, Menu, Typography } from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addMember, deleteBoard, removeMember } from '../store/boards/boardActions';
import { logout } from '../store/auth/authActions';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { MemberRequest } from '../services/server/controllers/member';
import { useAppSelector } from '../hooks/useAppSelector';
import { AddMemberForm } from './AddMemberForm';
import { MembersModal } from './MembersModal/MembersModal';


type BoardMenuProps = {
  boardID: number
}

export const BoardMenu: React.FC<BoardMenuProps> = ({ boardID }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const board = useAppSelector(state => state.app.boards[boardID]);
  const userID = useAppSelector(state => state.auth.userID);

  const [membersModal, setMembersModal] = useState(false);

  const openMembersModal = () => {
    setMembersModal(true);
  };
  const closeMembersModal = () => {
    setMembersModal(false);
  };

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

  return (
    <Box position='relative'>
      <MembersModal boardID={boardID} status={membersModal} close={closeMembersModal} />
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='secondary'
      >
        <MoreVertRounded sx={{ color: 'primary.contrastText' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList>
          <MenuItem onClick={openMembersModal}>
            <ListItemIcon>
              <GroupOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Members</ListItemText>
          </MenuItem>
          {
            board.ownerId === userID &&
            <MenuItem onClick={handleDeleteBoard}>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete Board</ListItemText>
            </MenuItem>
          }
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
