import Box from '@mui/material/Box'
import { BoardLink } from './BoardLink';
import { boardListStyle } from './BoardList.style';
import { CreateBoard } from './CreateBoard';

type BoardListProps = {
  boardIDs: number[]
}

export const BoardList: React.FC<BoardListProps> = ({ boardIDs }) => {
  return (
    <Box sx={boardListStyle}>
      {
        boardIDs.map(boardID => {
          return (
            <BoardLink key={boardID} boardID={boardID} />
          )
        })
      }
      < CreateBoard />
    </Box >
  )
}
