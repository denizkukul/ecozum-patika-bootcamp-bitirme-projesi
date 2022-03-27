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

type MemberListItemProps = {
  username: string
  memberID: number
  onClick: (id: number) => void
}
export const MemberListItem: React.FC<MemberListItemProps> = ({ username, memberID, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemText>
        {username}
      </ListItemText>
      <ListItemButton onClick={() => onClick(memberID)}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

type MemberListProps = {
  boardID: number
  close: () => void
}

export const MemberList: React.FC<MemberListProps> = ({ boardID, close }) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(state => state.app.boards[boardID]);

  const handleRemoveMember = (id: number) => {
    dispatch(removeMember({ memberID: id, boardID: boardID }))
  }

  const handleAddMember = (formValues: MemberRequest) => {
    dispatch(addMember({ data: formValues }))
  }

  return (
    <Box sx={{ border: '1px solid gray', display: 'flex', flexDirection: 'column', position: 'absolute', top: '0px', right: '0px', width: '360px', minHeight: '150px', maxWidth: 360, bgcolor: 'background.paper', p: 2, zIndex: '100' }}>
      <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={close}><Close /></IconButton>
      <Typography mb={1}>
        Board Owner: {board.owner?.username}
      </Typography>
      <Divider />
      <List>
        {
          board.members.map(member => {
            return <MemberListItem key={member.id} username={member.username} memberID={member.BoardMember.id} onClick={handleRemoveMember} />
          })
        }
      </List>
      {board.members.length === 0 && <Typography>There are no members on this board.</Typography>}
      <Divider sx={{ marginTop: 'auto', marginBottom: 2 }} />
      <Box mt='auto'>
        <AddMemberForm boardID={boardID} onSubmit={handleAddMember} />
      </Box>
    </Box>
  )
}


type BoardMenuProps = {
  boardID: number
}

export const BoardMenu: React.FC<BoardMenuProps> = ({ boardID }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [memberList, setMemberList] = useState(false);
  const open = Boolean(anchorEl);
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

  const openMemberList = () => {
    setAnchorEl(null);
    setMemberList(true);
  }

  const closeMemberList = () => {
    setMemberList(false);
  }

  return (
    <Box position='relative'>
      {memberList && <MemberList boardID={boardID} close={closeMemberList} />}
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertRounded />
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
          <MenuItem onClick={openMemberList}>
            <ListItemIcon>
              <GroupOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Members</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteBoard}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete Board</ListItemText>
          </MenuItem>
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
