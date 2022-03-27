import { useAppSelector } from './hooks/useAppSelector';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './routes/RegisterPage';
import { BoardListPage } from './routes/BoardListPage';
import { BoardContentPage } from './routes/BoardContentPage';
import { RequireAuth } from './components/RequireAuth';
import { LoginPage } from './routes/LoginPage';
import Box from '@mui/material/Box/Box';

const App: React.FC = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <Box minHeight={'100vh'} display='flex' flexDirection='column'>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to={auth.userID ? `user${auth.userID}` : 'login'} />} />
          <Route path='login' element={auth.userID ? <Navigate to={`user${auth.userID}`} /> : <LoginPage />} />
          <Route path='register' element={auth.userID ? <Navigate to={`user${auth.userID}`} /> : <RegisterPage />} />
          <Route path='user:userID' element={<RequireAuth />}>
            <Route index element={<BoardListPage />} />
            <Route path='board:boardID' element={<BoardContentPage />} />
            <Route path='*' element={<Navigate to='' />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </Box>
  );
}

export default App;
