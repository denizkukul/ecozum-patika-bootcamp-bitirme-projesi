import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuth } from '../store/authSlice';
import { selectBoardIDs } from '../store/appdataSlice';

export const RequireAuth: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const boardIDs = useAppSelector(selectBoardIDs);
  let params = useParams();
  if (!auth.value.userID) return <Navigate to='/login' />;
  if (Number(params.userID) !== auth.value.userID) return <Navigate to={`/user${auth.value.userID}`} />
  if (params.boardID && !boardIDs.includes(Number(params.boardID))) return <Navigate to={`/user${auth.value.userID}`} />
  else return <Outlet />
}