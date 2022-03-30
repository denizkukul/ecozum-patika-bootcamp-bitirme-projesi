import Box from '@mui/material/Box/Box';

const style = {
  overflow: 'auto',
  flex: 1,
  p: 4,
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}

export const ScrollContainer: React.FC = ({ children }) => {
  return (
    <Box bgcolor='primary.light' sx={style}>
      {children}
    </Box>
  )
}
