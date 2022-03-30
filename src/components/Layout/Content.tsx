import Box from '@mui/material/Box/Box';

const style = {
  flex: '1 1 0',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  bgcolor: 'primary.light'
}

export const Content: React.FC = ({ children }) => {
  return (
    <Box sx={style}>
      {children}
    </Box>
  )
}
