import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { ListContainer } from "../components/ListContainer"
import { Loading } from "../components/Loading"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { getBoard } from "../store/boards/boardActions"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { BoardMenu } from "../components/BoardMenu"

export const BoardContentPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardID = Number(params.boardID);
  const appStatus = useAppSelector(state => state.app.status);
  const auth = useAppSelector(state => state.auth);
  const board = useAppSelector(state => state.app.boards[boardID]);

  useEffect(() => {
    dispatch(getBoard({ boardID }));
  }, [dispatch, boardID])

  return (
    appStatus === 'idle' ?
      <Box className="BoardListPage" sx={{ flex: '1 1 0', position: 'relative', display: 'flex', overflow: 'hidden', flexDirection: 'column', maxWidth: '100%' }}>
        <Header>
          <Box sx={{ height: '40px', width: '110px', position: 'absolute', left: '20px' }}>
            <Link to={`/user${auth.userID}`} style={{ display: 'block', height: '100%', width: '100%', textDecoration: 'none' }}>
              <Box sx={{ ':hover': { bgcolor: 'lightgray' }, bgcolor: 'whitesmoke', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}><ArrowBackRoundedIcon color='primary' /><Typography color='primary' sx={{ pl: '5px', fontFamily: 'Poppins', fontWeight: '700' }}>Boards</Typography></Box>
            </Link>
          </Box>
          <Typography color='primary' sx={{ fontFamily: 'Poppins', fontSize: '25px', fontWeight: '700', textAlign: 'center', flex: 1 }}>{board.title}</Typography>
          <Box mr={2}>
            <BoardMenu boardID={boardID} />
          </Box>
        </Header>
        <Box className="ListContainerParent" sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'center', pt: 1, flexDirection: 'column', overflow: 'hidden' }}>
          <ListContainer listIDs={board.listIDs} boardID={boardID} />
        </Box>
      </Box> :
      <Loading />
  )
}