import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box/Box';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AddMemberForm } from './AddMemberForm';
import { MemberListItem } from './MemberListItem';
import { closeButtonStyle, listItemStyle, modalStyle, modalTitleStyle, userNameStyle } from './MembersModal.style';
import Avatar from '@mui/material/Avatar/Avatar';

type MembersModalProps = {
  open: boolean
  boardID: number
  close: () => void
}

export const MembersModal: React.FC<MembersModalProps> = ({ boardID, open, close }) => {
  const board = useAppSelector(state => state.app.boards[boardID]);
  const userID = useAppSelector(state => state.auth.userID);
  const isOwner = board.ownerId === userID;

  return (
    <Dialog
      onClose={close}
      open={open}
      sx={modalStyle}
    >
      <DialogTitle sx={modalTitleStyle}>
        Board Members
        <IconButton color='secondary' onClick={close} sx={closeButtonStyle}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {
          board.owner &&
          <Box sx={listItemStyle}  >
            <Avatar sx={{ bgcolor: 'primary.main' }}>{(board.owner.username.slice(0, 1)).toUpperCase()}</Avatar>
            <Typography sx={{ ml: 2, ...userNameStyle }}>{board.owner.username}</Typography>
            <Typography sx={{ mr: 1 }}>Owner</Typography>
          </Box >
        }
        {
          board.members.map(member => {
            return <MemberListItem key={member.BoardMember.id} username={member.username} memberID={member.BoardMember.id} boardID={boardID} isOwner={isOwner} />
          })
        }
        {
          isOwner &&
          <Box mt={2}>
            <AddMemberForm boardID={boardID} ownerName={board.owner?.username} />
          </Box>
        }
      </DialogContent>
    </Dialog>
  );
}
