import { Box, Button, Checkbox, Chip, IconButton, LinearProgress, Modal, TextField, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addComment, addLabel, deleteCard, removeLabel, updateCard } from '../store/cards/cardActions';
import { Card as CardProps } from '../store/cards/cardsReducer';
import VisibilityRoundedIcon from '@mui/icons-material/Visibility';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { Delete, Remove } from '@mui/icons-material';
import { useState } from 'react';
import { AddLabelRequest } from '../services/server/controllers/label';
import { useAppSelector } from '../hooks/useAppSelector';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import { AddLabelMenu } from './AddLabelMenu';
import { Checklist } from './Checklist';
import { createChecklist, deleteChecklist } from '../store/checklists/checklistActions';
type Props = CardProps & {
  index: number
}

export const Card: React.FC<Props> = ({ index, ...cardData }) => {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const handleDeleteCard = () => {
    dispatch(deleteCard({ cardID: cardData.id || 0 }))
  }

  const showCardModal = () => {
    setModalActive(true);
  }

  const hideCardModal = () => {
    setModalActive(false);
  }

  return (
    <>
      <Draggable draggableId={String(cardData.id)} index={index}>
        {(provided, snapshot) => (
          <Box {...provided.draggableProps} ref={provided.innerRef}>
            <Box sx={{ padding: '10px', backgroundColor: 'transparent' }}>
              <Box sx={{ bgcolor: 'white', borderRadius: '10px', border: '1px solid gray' }}>
                <Box sx={{ p: 1, bgcolor: 'whitesmoke', borderBottom: '1px solid gray', display: 'flex', borderRadius: '10px 10px 0 0' }} {...provided.dragHandleProps}>
                  <Typography color='primary' sx={{ p: 1, fontSize: '16px', fontFamily: 'Poppins', fontWeight: '600' }}>{cardData.title}</Typography>
                </Box>
                <Box>
                  {cardData.description && <Box p={2} ><Typography>{cardData.description}</Typography></Box>}
                  {cardData.duedate && <Box p={2} ><Typography>{cardData.duedate}</Typography></Box>}
                  {cardData.duedate && <Box p={2} ><Typography>{cardData.checklistIDs}</Typography></Box>}
                  {cardData.duedate && <Box p={2} ><Typography>{cardData.labels}</Typography></Box>}
                  {cardData.duedate && <Box p={2} ><Typography>{cardData.comments}</Typography></Box>}
                </Box>
                <Box display='flex' p={1}>
                  <IconButton onClick={showCardModal}><VisibilityRoundedIcon /></IconButton>
                  <IconButton><InsertCommentOutlinedIcon /></IconButton>
                  <IconButton sx={{ marginLeft: 'auto' }} onClick={handleDeleteCard}><Delete /></IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Draggable>
      {modalActive && <CardModal open={modalActive} closeModal={hideCardModal} {...cardData} />}
    </>
  )
}

type CardModalProps = CardProps & {
  open: boolean
  closeModal: () => void
}



export const CardModal: React.FC<CardModalProps> = ({ open, closeModal, ...cardData }) => {
  const dispatch = useAppDispatch();
  const { id, comments, description, labels, title, duedate, checklistIDs } = cardData;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDuedate, setNewDuedate] = useState(duedate);
  const [newComment, setnewComment] = useState('');
  const [checklist, setChecklist] = useState('');
  const auth = useAppSelector(state => state.auth);

  const handleEditCard = () => {
    dispatch(updateCard({ cardID: id, data: { title: newTitle, description: newDescription } }));
  }

  const handleAddLabel = (data: AddLabelRequest) => {
    dispatch(addLabel({ data }))
  }

  const handleRemoveLabel = (labelID: number) => {
    dispatch(removeLabel({ cardID: id, labelID }))
  }

  const handleSendComment = () => {
    dispatch(addComment({ username: auth.username!, data: { cardId: id, message: newComment } }))
  }

  const handleCreateChecklist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createChecklist({ data: { cardId: id, title: checklist } }))
    setChecklist('');
  }

  const handleDeleteChecklist = (checklistID: number) => {
    dispatch(deleteChecklist({ checklistID }))
  }

  const labelOptions = useAppSelector(state => state.app.labelTypes);

  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '70%',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'scroll'
      }}>
        <Typography color='primary' fontSize='25px' fontWeight='600' mb={2}>{title}</Typography>
        <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }} >
          <TextField sx={{ m: 1 }} fullWidth variant='outlined' label='Title' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <TextField sx={{ m: 1 }} fullWidth multiline variant='outlined' label='Description' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          {/* <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      /> */}
          <Button onClick={handleEditCard}>Save Changes</Button>
        </Box>

        <Box width='70%' mb={3}>
          <Box display='flex'>
            <Typography color='primary' p={1} fontWeight={700}>Labels</Typography>
            <AddLabelMenu cardID={id} handleAddLabel={handleAddLabel} />
          </Box>
          {
            labels?.map(label => {
              return (
                <Chip key={label.id} label={labelOptions[label.id].title} sx={{ m: 1, ml: 0, fontWeight: '700', backgroundColor: labelOptions[label.id].color }} onDelete={() => handleRemoveLabel(label.id)} />
              )
            })
          }
        </Box>

        <Box width='70%' mb={3}>
          <Typography color='primary' p={1} fontWeight={700}>Checklists</Typography>
          <Box display='flex'>
            <Box component='form' sx={{ display: 'flex', alignItems: 'center' }} onSubmit={handleCreateChecklist}>
              <TextField type="text" value={checklist} placeholder="Checklist Title" onChange={e => setChecklist(e.target.value)} />
              <Button type='submit' sx={{ height: '56px', flex: 1, marginLeft: 2 }}>Create Checklist</Button>
            </Box>
          </Box>
          {
            checklistIDs.map(checklistID => {
              return (
                <Checklist key={checklistID} checklistID={checklistID} />
              )
            })
          }
        </Box>

        <Box width='70%'>
          <Typography color='primary' p={1} fontWeight={700}>Comments</Typography>
          <Box>
            {comments?.map(comment => {
              return (
                <Box key={comment.id} p={1} borderRadius='10px' bgcolor='whitesmoke' my={2}>
                  <Typography pb={1} borderBottom='1px solid gray'>Author: {comment.author.username}</Typography>
                  <Typography pt={1}>{comment.message}</Typography>
                </Box>
              )
            })}
          </Box>
          <TextField fullWidth multiline variant='outlined' label='New Comment' value={newComment} onChange={(e) => setnewComment(e.target.value)} />
          <Button onClick={handleSendComment}>Send</Button>
        </Box>
      </Box>
    </Modal>
  )
}