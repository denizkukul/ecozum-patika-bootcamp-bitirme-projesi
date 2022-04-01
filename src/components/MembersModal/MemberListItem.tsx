import { CancelOutlined } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar/Avatar'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import Typography from '@mui/material/Typography/Typography'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { removeMember } from '../../store/boards/boardActions'
import { listItemStyle, userNameStyle } from './MembersModal.style'

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
      <Avatar sx={{ bgcolor: 'primary.main' }}>{(username.slice(0, 1)).toUpperCase()}</Avatar>
      <Typography sx={{ ml: 2, ...userNameStyle }}>{username}</Typography>
      <Typography sx={{ mr: 1 }}>Member</Typography>
      {
        isOwner &&
        <IconButton onClick={handleRemoveMember}>
          <CancelOutlined />
        </IconButton>
      }
    </Box >
  )
}