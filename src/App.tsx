import { useAppSelector } from './hooks/useAppSelector';
import { selectAuth } from './store/authSlice';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { LoginPage } from './routes/LoginPage';
import { RegisterPage } from './routes/RegisterPage';
import { BoardListPage } from './routes/BoardListPage';
import { BoardContentPage } from './routes/BoardContentPage';
import { RequireAuth } from './components/RequireAuth';


const App: React.FC = () => {
  const auth = useAppSelector(selectAuth);

  return (
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to={auth.value.userID ? `user${auth.value.userID}` : 'login'} />} />
          <Route path='login' element={auth.value.userID ? <Navigate to={`user${auth.value.userID}`} /> : <LoginPage />} />
          <Route path='register' element={auth.value.userID ? <Navigate to={`user${auth.value.userID}`} /> : <RegisterPage />} />
          <Route path='user:userID' element={<RequireAuth />}>
            <Route index element={<BoardListPage />} />
            <Route path='board:boardID' element={<BoardContentPage />} />
            <Route path='*' element={<Navigate to='' />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;
