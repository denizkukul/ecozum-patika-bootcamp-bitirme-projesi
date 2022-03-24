import Box from '@mui/material/Box/Box';

export const Header: React.FC = ({ children }) => {
  return (
    <Box sx={{ borderBottom: '1px solid gray', bgcolor: 'whitesmoke', display: 'flex', alignItems: 'center', height: '70px', minHeight: '70px', width: '100%', position: 'relative' }}>
      {children}
    </Box>
  )
}
