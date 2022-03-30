import { useEffect } from 'react'
import { Header } from '../components/Layout/Header'
import { Loading } from '../components/Loading'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { getBoardList } from '../store/boards/boardActions'
import { getLabelTypes } from '../store/app/miscActions'
import { BoardList } from '../components/BoardList/BoardList'
import { BoardListHeader } from '../components/BoardList/BoardListHeader'
import { AppContainer } from '../components/Layout/AppContainer'

export const BoardListPage = () => {
  const boardIDs = useAppSelector(state => state.app.boardIDs);
  const appStatus = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardList());
    dispatch(getLabelTypes())
  }, [dispatch])

  return (
    appStatus === 'idle' ?
      <AppContainer>
        <Header>
          <BoardListHeader />
        </Header>
        <BoardList boardIDs={boardIDs} />
      </AppContainer> :
      <Loading />
  )
}