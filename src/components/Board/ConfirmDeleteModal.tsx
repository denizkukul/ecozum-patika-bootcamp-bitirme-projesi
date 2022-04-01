import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteBoard } from '../../store/boards/boardActions';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogContent from '@mui/material/DialogContent/DialogContent';

type ConfirmDeleteModalProps = {
  open: boolean
  boardID: number
  close: () => void
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, close, boardID }) => {
  const title = useAppSelector(state => state.app.boards[boardID].title);
  const dispatch = useAppDispatch();

  const handleDeleteBoard = () => {
    dispatch(deleteBoard({ boardID }));
    close();
  }
  return (
    <Dialog
      open={open}
      onClose={close}
    >
      <DialogTitle>
        {`Delete ${title} ?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Every list and card related to this board will be deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleDeleteBoard}>Confirm</Button>
        <Button onClick={close} autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
