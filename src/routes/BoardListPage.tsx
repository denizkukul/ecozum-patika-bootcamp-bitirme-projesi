import { useEffect } from 'react'
import { BoardLink } from '../components/BoardLink'
import { CreateBoardForm } from '../components/CreateBoardForm'
import { Loading } from '../components/Loading'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { BoardRequest } from '../services/server/controllers/board'
import { createBoard, getBoardList, selectAppStatus, selectBoardIDs } from '../store/appdataSlice'
import { logout, selectAuth } from '../store/authSlice'


export const BoardListPage = () => {
  const appStatus = useAppSelector(selectAppStatus);
  const boardIDs = useAppSelector(selectBoardIDs);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardList());
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleCreateBoard = (formData: BoardRequest) => {
    dispatch(createBoard(formData));
  }

  return (
    appStatus === 'idle' ?
      <div className='boardlist-page' style={{ flex: 1 }}>
        <div className='boardlist-header'>
          <div style={{ marginLeft: 'auto', paddingLeft: '150px' }}>Board List Page</div>
          <div style={{ marginLeft: 'auto' }} className='username'>{auth.value.username}</div>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='boardlinks-container'>
          {
            boardIDs.map(boardID => {
              return (
                <BoardLink key={boardID} boardID={boardID} />
              )
            })
          }
          <CreateBoardForm onSubmit={handleCreateBoard} />
        </div>
      </div> :
      <Loading />
  )
}