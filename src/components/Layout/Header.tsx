import Box from '@mui/material/Box/Box';

const style = {
  bgcolor: 'primary.dark',
  display: 'flex',
  alignItems: 'center',
  flex: '64px 0 0',
  width: '100%',
  position: 'relative'
}

export const Header: React.FC = ({ children }) => {
  return (
    <Box sx={style}>
      {children}
    </Box>
  )
}
