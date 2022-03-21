import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import { selectBoardsData } from "../store/appdataSlice"

type BoardLinkProps = {
  boardID: number
}

export const BoardLink: React.FC<BoardLinkProps> = ({ boardID }) => {
  const boardsData = useAppSelector(selectBoardsData)
  return (
    <Link to={`board${boardID}`} className='board-link-container' >
      <div className='board-link'>
        <div>{boardsData[boardID].title}</div>
      </div>
    </Link>
  )
}