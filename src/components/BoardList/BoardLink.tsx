import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { Typography } from '@mui/material';
import { linkContainerStyle, linkFlexStyle, linkIconStyle, linkInnerContStyle, linkStyle, linkTextContStyle, linkTextStyle } from './BoardList.style';

type BoardLinkProps = {
  boardID: number
}

export const BoardLink: React.FC<BoardLinkProps> = ({ boardID }) => {
  const board = useAppSelector(state => state.app.boards[boardID])
  return (
    <Box sx={linkContainerStyle}>
      <Link to={`board${boardID}`} style={linkStyle} >
        <Box sx={linkInnerContStyle}>
          <Box sx={linkFlexStyle}>
            <DashboardRoundedIcon color='primary' sx={linkIconStyle} />
          </Box>
          <Box sx={linkTextContStyle}>
            <Typography color='primary' sx={linkTextStyle}>{board.title}</Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}