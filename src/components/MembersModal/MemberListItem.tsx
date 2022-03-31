import { CancelOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import Typography from '@mui/material/Typography/Typography'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { removeMember } from '../../store/boards/boardActions'
import { listItemStyle } from './MembersModal.style'

type MemberListItemProps = {
  username: string
  memberID: number
  boardID: number
  isOwner: boolean
}

export const MemberListItem: React.FC<MemberListItemProps> = ({ username, memberID, boardID, isOwner }) => {
  const dispatch = useAppDispatch();
  const handleRemoveMember = () => {
    dispatch(removeMember({ memberID, boardID }))
  }

  return (
    <Box sx={listItemStyle}  >
      <Typography>{username}</Typography>
      {
        isOwner &&
        <IconButton onClick={handleRemoveMember}>
          <CancelOutlined />
        </IconButton>
      }
    </Box >
  )
}