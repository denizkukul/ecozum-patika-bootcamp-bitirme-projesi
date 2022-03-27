import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

export const RequireAuth: React.FC = () => {
  const auth = useAppSelector(state => state.auth);
  const boardIDs = useAppSelector(state => state.app.boardIDs);
  let params = useParams();
  if (!auth.userID) return <Navigate to='/login' />;
  if (Number(params.userID) !== auth.userID) return <Navigate to={`/user${auth.userID}`} />
  if (params.boardID && !boardIDs.includes(Number(params.boardID))) return <Navigate to={`/user${auth.userID}`} />
  else return <Outlet />
}