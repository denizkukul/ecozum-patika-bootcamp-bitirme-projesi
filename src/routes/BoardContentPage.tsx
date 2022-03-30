import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Board } from '../components/Board/Board'
import { Loading } from '../components/Loading'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { getBoard } from '../store/boards/boardActions'
import { BoardHeader } from '../components/Board/BoardHeader'
import { Header } from '../components/Layout/Header'
import { AppContainer } from '../components/Layout/AppContainer'
import { Content } from '../components/Layout/Content'

export const BoardContentPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardID = Number(params.boardID);
  const appStatus = useAppSelector(state => state.app.status);

  useEffect(() => {
    dispatch(getBoard({ boardID }));
  }, [dispatch, boardID])

  return (
    appStatus === 'idle' ?
      <AppContainer>
        <Header>
          <BoardHeader boardID={boardID} />
        </Header>
        <Content>
          <Board boardID={boardID} />
        </Content>
      </AppContainer> :
      <Loading />
  )
}