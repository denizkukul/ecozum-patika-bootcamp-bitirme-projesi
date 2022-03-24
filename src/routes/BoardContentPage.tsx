import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { ListContainer } from "../components/ListContainer"
import { Loading } from "../components/Loading"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { getBoard, selectAppStatus, selectBoardsData } from "../store/appdataSlice"
import { selectAuth } from "../store/authSlice"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { BoardMenu } from "../components/BoardMenu"

export const BoardContentPage = () => {
  const dispatch = useAppDispatch();
  const boardsData = useAppSelector(selectBoardsData);
  const appStatus = useAppSelector(selectAppStatus);
  const auth = useAppSelector(selectAuth);
  const params = useParams();
  const boardID = Number(params.boardID);

  useEffect(() => {
    dispatch(getBoard(boardID));
  }, [dispatch, boardID])

  return (
    appStatus === 'idle' ?
      <Box sx={{ flex: '1 1 0', position: 'relative', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
        <Header>
          <Box sx={{ height: '40px', width: '110px', position: 'absolute', left: '20px' }}>
            <Link to={`/user${auth.value.userID}`} style={{ display: 'block', height: '100%', width: '100%', textDecoration: 'none' }}>
              <Box sx={{ ':hover': { bgcolor: 'lightgray' }, bgcolor: 'whitesmoke', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}><ArrowBackRoundedIcon color='primary' /><Typography color='primary' sx={{ pl: '5px', fontFamily: 'Poppins', fontWeight: '700' }}>Boards</Typography></Box>
            </Link>
          </Box>
          <Typography color='primary' sx={{ fontFamily: 'Poppins', fontSize: '25px', fontWeight: '700', textAlign: 'center', flex: 1 }}>{boardsData[boardID].title}</Typography>
          <Box mr={2}>
            <BoardMenu boardID={boardID} />
          </Box>
        </Header>
        <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'center', pt: 1, flexDirection: 'column', overflow: 'hidden' }}>
          <ListContainer listIDs={boardsData[boardID].listIDs} boardID={boardID} />
        </Box>
      </Box> :
      <Loading />
  )
}