import Box from '@mui/material/Box/Box';

export const Header: React.FC = ({ children }) => {
  return (
    <Box sx={{ bgcolor: 'primary.dark', display: 'flex', alignItems: 'center', height: '70px', minHeight: '70px', width: '100%', position: 'relative' }}>
      {children}
    </Box>
  )
}
