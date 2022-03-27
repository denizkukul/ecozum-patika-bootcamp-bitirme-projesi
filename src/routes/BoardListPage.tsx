import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { BoardLink } from '../components/BoardLink'
import { CreateBoardForm } from '../components/CreateBoardForm'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { BoardRequest } from '../services/server/controllers/board'
import { createBoard, getBoardList } from '../store/boards/boardActions'
import { getLabelTypes } from '../store/app/miscActions'
import { BoardListMenu } from '../components/BoardListMenu'

export const BoardListPage = () => {
  const boardIDs = useAppSelector(state => state.app.boardIDs);
  const appStatus = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardList());
    dispatch(getLabelTypes())
  }, [dispatch])

  const handleCreateBoard = (formData: BoardRequest) => {
    dispatch(createBoard({ data: formData }));
  }

  return (
    appStatus === 'idle' ?
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
        <Header>
          <Typography color="primary" sx={{ fontFamily: 'Poppins', fontSize: '25px', fontWeight: '700', textAlign: 'center', flex: 1 }}>Boards</Typography>
          <Box position='absolute' right='20px' >
            <BoardListMenu />
          </Box>
        </Header>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', px: 10, py: 6, flexWrap: 'wrap', overflow: 'auto' }}>
          {
            boardIDs.map(boardID => {
              return (
                <BoardLink key={boardID} boardID={boardID} />
              )
            })
          }
          <CreateBoardForm onSubmit={handleCreateBoard} />
        </Box>
      </Box> :
      <Loading />
  )
}