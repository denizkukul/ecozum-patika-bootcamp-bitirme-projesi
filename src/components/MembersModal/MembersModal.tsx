import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks/useAppSelector';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import { CancelOutlined, Close } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Box from '@mui/material/Box/Box';
import { MemberRequest } from '../../services/server/controllers/member';
import Divider from '@mui/material/Divider/Divider';
import List from '@mui/material/List/List';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AddMemberForm } from '../AddMemberForm';
import { addMember, removeMember } from '../../store/boards/boardActions';


type MemberListItemProps = {
  username: string
  memberID: number
  removeMember: (id: number) => void
}

export const MemberListItem: React.FC<MemberListItemProps> = ({ username, memberID, removeMember }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', borderBottom: '1px solid lightgray' }}  >
      <Typography>{username}</Typography>
      <IconButton onClick={() => removeMember(memberID)}>
        <CancelOutlined />
      </IconButton>
    </Box >
  )
}


type MembersModalProps = {
  status: boolean
  boardID: number
  close: () => void
}

export const MembersModal: React.FC<MembersModalProps> = ({ status, boardID, close }) => {
  const board = useAppSelector(state => state.app.boards[boardID]);
  const dispatch = useAppDispatch();

  const handleRemoveMember = (id: number) => {
    dispatch(removeMember({ memberID: id, boardID: boardID }))
  }

  const handleAddMember = (formValues: MemberRequest) => {
    dispatch(addMember({ data: formValues }))
  }


  return (
    <Dialog
      onClose={close}
      open={status}
    >
      <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText' }}>
        Board Members
        <IconButton color='secondary' onClick={close} sx={{ position: 'absolute', right: 11, top: 11 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: 'primary.main', fontWeight: '700', py: 2, borderBottom: '1px solid lightgray' }}>Board owner: {board.owner?.username}</Typography>
        {
          board.members.map(member => {
            return <MemberListItem key={member.BoardMember.id} username={member.username} memberID={member.BoardMember.id} removeMember={handleRemoveMember} />
          })
        }
        <Box mt={2}>
          <AddMemberForm boardID={boardID} onSubmit={handleAddMember} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
