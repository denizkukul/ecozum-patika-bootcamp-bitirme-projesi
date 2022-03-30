import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Chip from '@mui/material/Chip/Chip';
import Modal from '@mui/material/Modal/Modal';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import MuiCard from '@mui/material/Card/Card';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import { addComment, removeLabel, updateCard } from '../../store/cards/cardActions';
import { AddLabelMenu } from './AddLabel';
import { Checklist } from '../Checklist/Checklist';
import { CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Close, CommentOutlined, LabelOutlined } from '@mui/icons-material';
import { CreateChecklistMenu } from './CreateChecklistMenu';
import { SetDuedate } from './SetDuedate';
import { modalContainerStyle, modalHeaderStyle, modalStyle } from './CardModal.style';

type CardModalProps = {
  cardID: number
  open: boolean
  close: () => void
}

export const CardModal: React.FC<CardModalProps> = ({ cardID, open, close }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.username)!;
  const card = useAppSelector(state => state.app.cards[cardID]);
  const { formValues, updateFormValues } = useForm({ title: card.title, description: card.description || '' });
  const [newComment, setNewComment] = useState('');

  const handleUpdateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCard({ cardID: card.id, data: formValues }));
  }

  const handleRemoveLabel = (cardLabelID?: number) => {
    if (cardLabelID) {
      dispatch(removeLabel({ cardID, cardLabelID }))
    }
  }

  const handleAddComment = () => {
    dispatch(addComment({ username, data: { cardId: cardID, message: newComment } }))
  }

  return (
    <Modal sx={modalContainerStyle} open={open} onClose={close}>
      <Box >
        <MuiCard sx={modalStyle} variant='outlined'>
          <CardHeader
            sx={modalHeaderStyle}
            action={
              <CardActions sx={{ flex: 1 }}>
                <SetDuedate cardID={cardID} />
                <CreateChecklistMenu cardID={cardID} />
                <AddLabelMenu cardID={cardID} />
                <IconButton onClick={close} color='secondary' sx={{ '&.MuiButtonBase-root': { ml: 'auto' } }}>
                  <Close />
                </IconButton>
              </CardActions>
            }
          />
          <CardContent sx={{
            bgcolor: 'background.paper',
            overflow: 'overlay',
            height: 'max-content',
            px: 3
          }}>

            <Typography color='primary' fontSize='25px' fontWeight='600' my={1}>{card.title}</Typography>
            <Box component='form' sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }} onSubmit={handleUpdateCard}>
              <TextField sx={{ m: 1 }} fullWidth name='title' variant='outlined' label='Title' value={formValues.title} onChange={updateFormValues} />
              <TextField sx={{ m: 1 }} fullWidth name='description' multiline variant='outlined' label='Description' value={formValues.description} onChange={updateFormValues} />

              <Button type='submit'>Save</Button>
            </Box>

            {
              card.labels.length > 0 &&
              <Box width='100%' mb={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LabelOutlined color='primary' />
                  <Typography color='primary' py={1} ml={1} fontWeight={700}>Labels</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, border: '1px solid lightgray', borderRadius: 1, p: 1.5 }}>
                  {
                    card.labels.map(label =>
                      <Chip onDelete={() => handleRemoveLabel(label.CardLabel.id)} key={label.CardLabel.id} label={label.title} color='primary' sx={{ color: 'white', bgcolor: label.color }} />)
                  }
                </Box>
              </Box>
            }


            <Box width='100%' mb={3}>
              {
                card.checklistIDs.map(checklistID => {
                  return (
                    <Checklist key={checklistID} checklistID={checklistID} />
                  )
                })
              }
            </Box>

            <Box width='100%'>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CommentOutlined color='primary' />
                <Typography color='primary' py={1} ml={1} fontWeight={700}>Comments</Typography>
              </Box>
              <Box>
                {card.comments?.map(comment => {
                  return (
                    <Box key={comment.id} p={1} borderRadius={1} border='1px solid lightgray' my={2}>
                      <Typography color='primary.main'>{comment.author.username}:</Typography>
                      <Typography pt={1}>{comment.message}</Typography>
                    </Box>
                  )
                })}
                {
                  card.comments.length === 0 &&
                  <Typography color='text.disabled'>This card has no comments.</Typography>
                }
              </Box>
              <Box>
                <TextField sx={{ mt: 1 }} fullWidth multiline variant='outlined' label='New Comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <Button sx={{ mx: 2 }} onClick={handleAddComment}>Send</Button>
              </Box>
            </Box>
          </CardContent>

        </MuiCard>
      </Box>
    </Modal >
  )
}