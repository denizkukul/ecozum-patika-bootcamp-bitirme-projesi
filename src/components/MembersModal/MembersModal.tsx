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
import { closeButtonStyle, modalTitleStyle, ownerNameStyle } from './MembersModal.style';

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
    >
      <DialogTitle sx={modalTitleStyle}>
        Board Members
        <IconButton color='secondary' onClick={close} sx={closeButtonStyle}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={ownerNameStyle}>Board owner: {board.owner?.username}</Typography>
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
