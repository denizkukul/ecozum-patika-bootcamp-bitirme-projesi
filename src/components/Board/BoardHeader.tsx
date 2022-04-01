import { Box, Button, IconButton } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BoardMenu } from './BoardMenu';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { updateBoard } from '../../store/boards/boardActions';
import { BoardEdit } from './BoardEdit';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Edit } from '@mui/icons-material';
import { backButtonStyle, backLinkStyle, buttonContainerStyle, editButtonStyle, titleContainerStyle } from './Board.style';
import { Title } from '../Layout/Title';
import { MembersModal } from '../MembersModal/MembersModal';
import { Pending } from '../Pending';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

type BoardHeaderProps = {
  boardID: number
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({ boardID }) => {
  const pending = useAppSelector(state => state.status.pending);
  const board = useAppSelector(state => state.app.boards[boardID]);
  const auth = useAppSelector(state => state.auth);
  const [editing, setEditing] = useState(false);
  const [membersModalStatus, setMembersModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const headerRef = useRef<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const isOwner = (board.ownerId === auth.userID)

  const startEdit = () => {
    setEditing(true);
  }

  const saveEdit = (value: string) => {
    dispatch(updateBoard({ boardID: board.id, data: { title: value } }));
    setEditing(false);
  }

  const cancelEdit = () => {
    setEditing(false);
  }

  const openMembersModal = () => {
    setMembersModalStatus(true);
  }
  const closeMembersModal = () => {
    setMembersModalStatus(false);
  }

  const openDeleteModal = () => {
    setDeleteModalStatus(true);
  }
  const closeDeleteModal = () => {
    setDeleteModalStatus(false);
  }

  return (
    <Box ref={headerRef} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <BoardEdit title={board.title} open={editing} anchor={headerRef.current!} saveEdit={saveEdit} cancelEdit={cancelEdit} />
      <MembersModal open={membersModalStatus} close={closeMembersModal} boardID={boardID} />
      <ConfirmDeleteModal open={deleteModalStatus} close={closeDeleteModal} boardID={boardID} />
      <Box sx={backButtonStyle}>
        <Link to={`/user${auth.userID}`} style={backLinkStyle}>
          <Button
            color='secondary'
            startIcon={<ArrowBackRoundedIcon sx={{ mb: '2px' }} />}>
            Boards
          </Button>
        </Link>
      </Box>
      <Box sx={titleContainerStyle}>
        <Box sx={buttonContainerStyle}>
          <Title>{board.title}</Title>
          {
            isOwner &&
            <IconButton onClick={startEdit} color='secondary' sx={editButtonStyle} >
              <Edit sx={{ color: 'primary.dark' }} />
            </IconButton>
          }
        </Box>
      </Box>
      {
        pending ?
          <Box sx={{ position: 'absolute', right: '24px' }}>
            <Pending />
          </Box> :
          <Box sx={{ position: 'absolute', right: '20px' }} >
            <BoardMenu boardID={boardID} openMembersModal={openMembersModal} openDeleteModal={openDeleteModal} startEdit={startEdit} />
          </Box>
      }
    </Box>
  )
}