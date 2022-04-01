import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Delete, Edit, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Divider, IconButton, Menu } from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteBoard, removeMember } from '../../store/boards/boardActions';
import { logout } from '../../store/auth/authActions';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useAppSelector } from '../../hooks/useAppSelector';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useNavigate } from 'react-router-dom';

type BoardMenuProps = {
  boardID: number
  openMembersModal: () => void
  startEdit: () => void
  openDeleteModal: () => void
}

export const BoardMenu: React.FC<BoardMenuProps> = ({ boardID, openMembersModal, openDeleteModal, startEdit }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const board = useAppSelector(state => state.app.boards[boardID]);
  const userID = useAppSelector(state => state.auth.userID);
  const isOwner = (board.ownerId === userID);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleOpenMemberModal = () => {
    openMembersModal();
    handleClose();
  }

  const handleOpenDeleteModal = () => {
    openDeleteModal();
    handleClose();
  }
  const handleStartEdit = () => {
    startEdit();
    handleClose();
  }

  const handleLeaveBoard = () => {
    const member = board.members.find(member => member.BoardMember.userId === userID)!
    dispatch(removeMember({ memberID: member.BoardMember.id, boardID: boardID }))
    navigate(`/user${userID}`)
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
          {
            isOwner &&
            <MenuItem onClick={handleStartEdit}>
              <ListItemIcon>
                <Edit fontSize='small' />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          }
          <MenuItem onClick={handleOpenMemberModal}>
            <ListItemIcon>
              <GroupOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Members</ListItemText>
          </MenuItem>
          {
            isOwner &&
            <MenuItem onClick={handleOpenDeleteModal}>
              <ListItemIcon>
                <Delete fontSize='small' />
              </ListItemIcon>
              <ListItemText>Delete Board</ListItemText>
            </MenuItem>
          }
          {
            !isOwner &&
            <MenuItem onClick={handleLeaveBoard}>
              <ListItemIcon>
                <HighlightOffOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Leave Board</ListItemText>
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
