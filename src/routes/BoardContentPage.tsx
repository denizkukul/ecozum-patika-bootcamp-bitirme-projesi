import { Box, Button, ClickAwayListener, IconButton, Input, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { ListContainer } from "../components/ListContainer"
import { Loading } from "../components/Loading"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { getBoard, updateBoard } from "../store/boards/boardActions"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { BoardMenu } from "../components/BoardMenu"
import blueGrey from "@mui/material/colors/blueGrey"
import { CancelOutlined, Edit } from "@mui/icons-material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

export const BoardContentPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardID = Number(params.boardID);
  const appStatus = useAppSelector(state => state.app.status);
  const auth = useAppSelector(state => state.auth);
  const board = useAppSelector(state => state.app.boards[boardID]);
  const [edit, setEdit] = useState({ editing: false, newBoardTitle: board.title })

  useEffect(() => {
    dispatch(getBoard({ boardID }));
  }, [dispatch, boardID])

  const startEdit = () => {
    setEdit(prev => { return { ...prev, editing: true } });
  }
  const saveEdit = () => {
    dispatch(updateBoard({ boardID: board.id, data: { title: edit.newBoardTitle } }));
    setEdit(prev => { return { ...prev, editing: false } });
  }
  const cancelEdit = () => {
    setEdit({ editing: false, newBoardTitle: board.title });
  }

  return (
    appStatus === 'idle' ?
      <Box className="BoardListPage" sx={{ flex: '1 1 0', position: 'relative', display: 'flex', overflow: 'hidden', flexDirection: 'column', minHeight: '100vh', maxWidth: '100%' }}>
        <Header>
          <Box sx={{ height: '40px', width: '110px', position: 'absolute', left: '20px' }}>
            <Link to={`/user${auth.userID}`} style={{ display: 'block', height: '100%', width: '100%', textDecoration: 'none' }}>
              <Button color='secondary' startIcon={<ArrowBackRoundedIcon sx={{ mb: '2px' }} />}>Boards</Button>
            </Link>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {
              edit.editing ?
                <ClickAwayListener onClickAway={cancelEdit}>
                  <Box component='form' sx={{ position: 'relative', bgcolor: 'primary.dark', height: '64px', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onSubmit={saveEdit}>
                    <Input onFocus={(e) => e.target.select()} autoFocus disableUnderline sx={{ color: 'primary.contrastText', fontFamily: 'Poppins', fontSize: '25px', fontWeight: '700', '&.MuiInput-root': { '.MuiInput-input': { textAlign: 'center', maxWidth: '200px' } } }} value={edit.newBoardTitle} onChange={(e) => setEdit({ editing: true, newBoardTitle: e.target.value })} />
                    <IconButton sx={{ position: 'absolute', right: '-60px' }} onClick={cancelEdit}><CancelOutlined sx={{ color: 'white' }} /></IconButton>
                    <IconButton sx={{ position: 'absolute', right: '-30px' }} type='submit'><SaveOutlinedIcon sx={{ color: 'white' }} /></IconButton>
                  </Box>
                </ClickAwayListener> :
                <Box sx={{ position: 'relative', ':hover': { '.MuiIconButton-root': { '.MuiSvgIcon-root': { color: 'white' } } } }}>
                  <Typography color='primary.contrastText' sx={{ fontFamily: 'Poppins', fontSize: '25px', fontWeight: '700', textAlign: 'center', display: 'inline' }}>{board.title}</Typography>
                  <IconButton onClick={startEdit} color='secondary' sx={{ position: 'absolute', right: '-45px', bottom: '0' }} >
                    <Edit sx={{ color: 'primary.dark' }} />
                  </IconButton>
                </Box>
            }
          </Box>
          <Box position='absolute' right='10px' mr={2}>
            <BoardMenu boardID={boardID} />
          </Box>
        </Header>
        <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'center', flexDirection: 'column', overflow: 'hidden', bgcolor: 'primary.light' }}>
          <ListContainer listIDs={board.listIDs} boardID={boardID} />
        </Box>
      </Box> :
      <Loading />
  )
}