import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Chip from '@mui/material/Chip/Chip';
import Modal from '@mui/material/Modal/Modal';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import { AddLabelRequest, LabelTypeResponse } from '../../services/server/controllers/label';
import { addComment, addLabel, removeLabel, updateCard } from '../../store/cards/cardActions';
import { createChecklist } from '../../store/checklists/checklistActions';
import { AddLabelMenu } from '../AddLabelMenu';
import { Checklist } from '../Checklist/Checklist';
import MuiCard from '@mui/material/Card/Card';
import { CardActions, CardContent, CardHeader, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { CheckBoxOutlined, Close, CommentOutlined, Label, LabelOutlined } from '@mui/icons-material';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import { borderRadius } from '@mui/system';
import { CreateChecklistMenu } from '../CreateChecklistMenu';
import { SetDuedate } from '../SetDuedate';

type CardDetailsProps = {
  cardID: number
  open: boolean
  close: () => void
}

export const CardDetails: React.FC<CardDetailsProps> = ({ cardID, open, close }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.username)!;
  const card = useAppSelector(state => state.app.cards[cardID]);
  const { formValues, updateFormValues } = useForm({ defaultValues: { title: card.title, description: card.description || '' } });
  const [newComment, setNewComment] = useState('');
  const [checklistTitle, setChecklistTitle] = useState('');
  const [labels, setLabels] = useState(card.labels.map(label => label.CardLabel.labelId));

  // TODO: Multiple select component
  const handleChange = (e: SelectChangeEvent<typeof labels>) => {
    const value = e.target.value
    console.log(value);
    setLabels(
      typeof value === 'string' ? (value.split(',').map(id => Number(id))) : value,
    );
  };
  const handleUpdateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCard({ cardID: card.id, data: formValues }));
  }

  const handleAddLabel = (data: AddLabelRequest) => {
    dispatch(addLabel({ data }))
  }

  const handleRemoveLabel = (cardLabelID?: number) => {
    if (cardLabelID) {
      dispatch(removeLabel({ cardID, cardLabelID }))
    }
  }

  const handleAddComment = () => {
    dispatch(addComment({ username, data: { cardId: cardID, message: newComment } }))
  }

  const handleCreateChecklist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createChecklist({ data: { cardId: cardID, title: checklistTitle } }))
    setChecklistTitle('');
  }


  const labelTypes = useAppSelector(state => state.app.labelTypes);

  return (
    <Modal sx={{ display: 'flex', minHeight: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center' }} open={open} onClose={close}>
      <Box >
        <MuiCard sx={{
          width: 800,
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          borderColor: 'primary.dark'
        }}
          variant='outlined'
        >
          <CardHeader
            sx={{
              bgcolor: 'primary.dark', p: 1, justifyContent: 'flex-start',
              '.MuiCardHeader-content': { flex: 0 },
              '.MuiCardHeader-action': { flex: 1 },
            }}
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
                  {
                    card.labels.length === 0 &&
                    <Typography lineHeight='32px' color='text.disabled'>This card has no labels.</Typography>
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