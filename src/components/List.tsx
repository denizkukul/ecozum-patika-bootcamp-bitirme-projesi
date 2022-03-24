import { Box, Typography } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { CreateCardRequest } from '../services/server/controllers/card';
import { createCard, selectCardsData } from '../store/appdataSlice';
import { List as ListProps } from '../store/appdataSlice';
import { Card } from './Card';
import { CreateCardForm } from './CreateCardForm';
import { ListMenu } from './ListMenu';

type Props = ListProps & {
  index: number;
}

export const List: React.FC<Props> = ({ index, ...listData }) => {
  const cards = useAppSelector(selectCardsData);
  const dispatch = useAppDispatch();
  const handleCreateCard = (formValues: CreateCardRequest) => {
    dispatch(createCard(formValues))
  }

  return (
    <Draggable draggableId={`list-${listData.id}`} index={index}>
      {(provided, snapshot) => (
        <Box sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: 'white', borderRadius: '10px', flex: '350px 0 0', mr: 2, border: '1px solid gray' }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'whitesmoke', borderRadius: '10px 10px 0 0', borderBottom: '1px solid gray' }} {...provided.dragHandleProps}>
            <Typography color='primary' sx={{ p: 1, fontSize: '18px', fontFamily: 'Poppins', fontWeight: '600' }}>{listData.title}</Typography>
            <ListMenu listID={listData.id} />
          </Box>
          <Droppable droppableId={String(listData.id)}>
            {(provided, snapshot) =>
              <Box sx={{ flex: 1, borderRadius: '0 0 10px 10px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  listData.cardIDs.map((cardID, index) => {
                    return <Card key={cardID} index={index} {...cards[cardID]} />
                  })
                }
                {provided.placeholder}
              </Box>
            }
          </Droppable>
          <Box mt='auto' borderTop='1px solid gray'>
            <CreateCardForm onSubmit={handleCreateCard} listID={listData.id} />
          </Box>
        </Box>
      )}
    </Draggable>
  )
}