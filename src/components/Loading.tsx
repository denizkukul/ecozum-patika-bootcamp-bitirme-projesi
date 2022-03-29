import Box from "@mui/material/Box/Box"
import CircularProgress from "@mui/material/CircularProgress/CircularProgress"

export const Loading: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minWidth: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  )
}