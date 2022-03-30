import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

export const RequireAuth: React.FC = () => {
  const auth = useAppSelector(state => state.auth);
  const boardIDs = useAppSelector(state => state.app.boardIDs);
  let params = useParams();

  // Not logged in => to login page
  if (!auth.userID) return <Navigate to='/login' />;

  // Not current users boardlist => to current users board list
  if (Number(params.userID) !== auth.userID) return <Navigate to={`/user${auth.userID}`} />

  // Not current users board => to current users board list
  if (params.boardID && !boardIDs.includes(Number(params.boardID))) return <Navigate to={`/user${auth.userID}`} />
  else return <Outlet />
}