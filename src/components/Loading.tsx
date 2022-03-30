import Box from '@mui/material/Box/Box'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

const style = {
  display: 'flex',
  minWidth: '100%',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center'
}

export const Loading: React.FC = () => {
  return (
    <Box sx={style}>
      <CircularProgress />
    </Box>
  )
}