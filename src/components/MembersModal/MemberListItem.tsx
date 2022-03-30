import { CancelOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import Typography from '@mui/material/Typography/Typography'
import { listItemStyle } from './MembersModal.style'

type MemberListItemProps = {
  username: string
  memberID: number
  removeMember: (id: number) => void
}

export const MemberListItem: React.FC<MemberListItemProps> = ({ username, memberID, removeMember }) => {
  return (
    <Box sx={listItemStyle}  >
      <Typography>{username}</Typography>
      <IconButton onClick={() => removeMember(memberID)}>
        <CancelOutlined />
      </IconButton>
    </Box >
  )
}