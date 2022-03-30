import { Box } from '@mui/material';
import { Title } from '../Layout/Title';
import { BoardListMenu } from './BoardListMenu';

export const BoardListHeader: React.FC = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <Title>Boards</Title>
      <Box sx={{ position: 'absolute', right: '20px' }} >
        <BoardListMenu />
      </Box>
    </Box>
  )
}