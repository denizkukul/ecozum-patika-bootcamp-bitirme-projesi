import Box from '@mui/material/Box/Box'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const Pending: React.FC = () => {
  return (
    <Box sx={style}>
      <CircularProgress size={32} />
    </Box>
  )
}