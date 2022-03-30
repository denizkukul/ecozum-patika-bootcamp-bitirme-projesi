import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box/Box';
import { useAppSelector } from '../../hooks/useAppSelector';
import { MemberRequest } from '../../services/server/controllers/member';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AddMemberForm } from '../Board/AddMemberForm';
import { addMember, removeMember } from '../../store/boards/boardActions';
import { MemberListItem } from './MemberListItem';
import { modalTitleStyle, ownerNameStyle } from './MembersModal.style';


type MembersModalProps = {
  open: boolean
  boardID: number
  close: () => void
}

export const MembersModal: React.FC<MembersModalProps> = ({ boardID, open, close }) => {
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
      open={open}
    >
      <DialogTitle sx={modalTitleStyle}>
        Board Members
        <IconButton color='secondary' onClick={close} sx={{ position: 'absolute', right: 11, top: 11 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={ownerNameStyle}>Board owner: {board.owner?.username}</Typography>
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
