import { CommentOutlined } from '@mui/icons-material'
import { Avatar, Tooltip } from '@mui/material';
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography'
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addComment } from '../../store/cards/cardActions';
import { Comment } from '../../store/cards/cardsReducer';
import { commentStyle, userNameStyle } from './CardModal.style';

type CommnetsProps = {
  cardID: number
  comments: Comment[]
}

export const Comments: React.FC<CommnetsProps> = ({ cardID, comments }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.username)!;
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    dispatch(addComment({ username, data: { cardId: cardID, message: newComment } }))
    setNewComment('');
  }

  return (
    <Box width='100%'>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CommentOutlined color='primary' />
        <Typography color='primary' py={1} ml={1} fontWeight={700}>Comments</Typography>
      </Box>
      <Box>
        {
          comments.map(comment => {
            return (
              <Box key={comment.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Tooltip title={comment.author.username}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{(comment.author.username.slice(0, 1)).toUpperCase()}</Avatar>
                </Tooltip>
                <Box sx={commentStyle}>
                  <Typography>{comment.message}</Typography>
                </Box>
              </Box>
            )
          })
        }
        {
          comments.length === 0 &&
          <Typography sx={{ my: 1 }} color='text.disabled'>This card has no comments.</Typography>
        }
      </Box>
      <Box sx={{ display: 'flex' }}>
        <TextField sx={{ mt: 1 }} fullWidth multiline variant='outlined' label='New Comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button sx={{ ml: 2, mt: 'auto', height: '56px' }} onClick={handleAddComment}>Send</Button>
      </Box>
    </Box >
  )
}
