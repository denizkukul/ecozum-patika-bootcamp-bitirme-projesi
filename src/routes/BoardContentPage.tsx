import Box from '@mui/material/Box/Box'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Board } from '../components/Board/Board'
import { Loading } from '../components/Loading'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { getBoard } from '../store/boards/boardActions'
import { BoardHeader } from '../components/Board/BoardHeader'
import { Header } from '../components/Layout/Header'

export const BoardContentPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardID = Number(params.boardID);
  const appStatus = useAppSelector(state => state.app.status);
  const board = useAppSelector(state => state.app.boards[boardID]);

  useEffect(() => {
    dispatch(getBoard({ boardID }));
  }, [dispatch, boardID])

  return (
    appStatus === 'idle' ?
      <Box sx={{ flex: '1 1 0', position: 'relative', display: 'flex', overflow: 'hidden', flexDirection: 'column', minHeight: '100vh', maxWidth: '100%' }}>
        <Header>
          <BoardHeader boardID={board.id} />
        </Header>
        <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'center', flexDirection: 'column', overflow: 'hidden', bgcolor: 'primary.light' }}>
          <Board boardID={boardID} />
        </Box>
      </Box> :
      <Loading />
  )
}