import { CommentOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography'
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addComment } from '../../store/cards/cardActions';
import { Comment } from '../../store/cards/cardsReducer';

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
              <Box key={comment.id} p={1} borderRadius={1} border='1px solid lightgray' my={2}>
                <Typography color='primary.main'>{comment.author.username}:</Typography>
                <Typography pt={1}>{comment.message}</Typography>
              </Box>
            )
          })
        }
        {
          comments.length === 0 &&
          <Typography sx={{ my: 1 }} color='text.disabled'>This card has no comments.</Typography>
        }
      </Box>
      <Box>
        <TextField sx={{ mt: 1 }} fullWidth multiline variant='outlined' label='New Comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button sx={{ mx: 2 }} onClick={handleAddComment}>Send</Button>
      </Box>
    </Box >
  )
}
