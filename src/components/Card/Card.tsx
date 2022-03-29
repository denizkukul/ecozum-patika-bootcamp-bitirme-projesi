import { Box, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteCard } from '../../store/cards/cardActions';
import VisibilityRoundedIcon from '@mui/icons-material/Visibility';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { Check, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Card as MuiCard } from '@mui/material'
import { CardDetails } from '../CardDetails/CardDetails';
import { Checklist } from '../../store/checklists/checklistsReducer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

type ChecklistChipProps = {
  checklistID: number
}

const getChecklistProgress = (checklist: Checklist) => {
  let completed = 0;
  let total = checklist.items.length;
  checklist.items.forEach(item => {
    item.isChecked && completed++
  })
  return `${completed}/${total}`
}

const ChecklistChip: React.FC<ChecklistChipProps> = ({ checklistID }) => {
  const checklist = useAppSelector(state => state.app.checklists[checklistID]);
  return (
    <Chip icon={<CheckCircleOutlineIcon sx={{ fontSize: '19px' }} />} color='primary' sx={{ height: 'min-content', p: 0.4, fontSize: '14px', mr: 1, mb: 1 }} label={getChecklistProgress(checklist)} />
  )
}

type DuedateChipProps = {
  cardID: number
}

const DuedateChip: React.FC<DuedateChipProps> = ({ cardID }) => {
  const duedate = useAppSelector(state => state.app.cards[cardID].duedate);
  const formattedDuedate = format(parse(duedate!, 'yyyy-mm-dd', new Date()), 'MMM do yy');
  return (
    <Chip icon={<AccessTimeIcon sx={{ fontSize: '19px' }} />} color='warning' sx={{ height: 'min-content', p: 0.4, fontSize: '14px', mr: 1, mb: 1 }} label={formattedDuedate} />
  )
}

type CardProps = {
  index: number
  cardID: number
}

export const Card: React.FC<CardProps> = ({ index, cardID }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useAppDispatch();
  const card = useAppSelector(state => state.app.cards[cardID]);

  const handleDeleteCard = () => {
    dispatch(deleteCard({ cardID: card.id }))
  }

  const openCardDetails = () => {
    setShowDetails(true);
  }

  const closeCardDetails = () => {
    setShowDetails(false);
  }


  return (
    <>
      <Draggable draggableId={String(card.id)} index={index}>
        {(provided, snapshot) => (
          <MuiCard elevation={2} {...provided.draggableProps} ref={provided.innerRef} sx={{ mb: 2 }}>
            <CardContent sx={{ borderBottom: '1px solid lightgray', py: 1 }} {...provided.dragHandleProps}>
              {
                // Labels will be rendered at the top of the card
                card.labels &&
                <Box sx={{ mb: 0.5 }}>
                  {card.labels.map(label => {
                    return (<Chip key={label.id} sx={{ bgcolor: label.color, width: '32px', height: '8px', mr: 1 }} />)
                  })}
                </Box>
              }
              <Typography fontSize='18px'>{card.title}</Typography>
              {
                // Duedate and checklists will be rendered below card title
                <Box sx={{ mt: 1 }}>
                  {
                    card.duedate &&
                    <DuedateChip cardID={cardID} />
                  }
                  {
                    card.checklistIDs.map(checklistID => {
                      return (
                        <ChecklistChip key={checklistID} checklistID={checklistID} />
                      )
                    })
                  }
                </Box>
              }
              {
                card.description &&
                <Box >
                  <Typography>{card.description}</Typography>
                </Box>
              }
            </CardContent>
            <CardActions>
              <IconButton onClick={openCardDetails}><VisibilityRoundedIcon /></IconButton>
              <IconButton sx={{ '&.MuiButtonBase-root': { ml: 'auto' } }} onClick={handleDeleteCard}><Delete /></IconButton>
            </CardActions>
          </MuiCard>
        )}
      </Draggable>
      {showDetails && <CardDetails open={showDetails} close={closeCardDetails} cardID={card.id} />}
    </>
  )
}

