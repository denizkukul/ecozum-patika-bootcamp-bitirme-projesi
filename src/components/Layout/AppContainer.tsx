import Box from '@mui/material/Box/Box';

const style = {
  flex: '1 1 0',
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  minHeight: '100vh',
  maxWidth: '100%'
}

export const AppContainer: React.FC = ({ children }) => {
  return (
    <Box sx={style}>
      {children}
    </Box>
  )
}
