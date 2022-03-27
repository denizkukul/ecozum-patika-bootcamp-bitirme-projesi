import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { Typography } from "@mui/material";

type BoardLinkProps = {
  boardID: number
}

export const BoardLink: React.FC<BoardLinkProps> = ({ boardID }) => {
  const board = useAppSelector(state => state.app.boards[boardID])
  return (
    <Box sx={{ height: '200px', width: '200px', m: 4, mt: 0, bgcolor: 'whitesmoke', borderRadius: '20px', ':hover': { backgroundColor: 'lightgray' } }}>
      <Link to={`board${boardID}`} style={{ display: 'block', height: '100%', width: '100%' }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ width: '100%', flex: 45, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <DashboardRoundedIcon color='primary' sx={{ height: '50px', width: '50px' }} />
          </Box>
          <Box sx={{ width: '100%', flex: 55, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Typography color='primary' sx={{ fontFamily: 'Poppins', fontWeight: '600', m: 2, textAlign: 'center' }}>{board.title}</Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}