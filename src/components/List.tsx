import { Box, Typography } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { CreateCardRequest } from '../services/server/controllers/card';
import { createCard } from '../store/cards/cardActions';
import { List as ListProps } from '../store/lists/listsReducer';
import { Card } from './Card';
import { CreateCardForm } from './CreateCardForm';
import { ListMenu } from './ListMenu';

type Props = ListProps & {
  index: number;
}

export const List: React.FC<Props> = ({ index, ...listData }) => {
  const cards = useAppSelector(state => state.app.cards);
  const dispatch = useAppDispatch();
  const handleCreateCard = (formValues: { title: string }) => {
    dispatch(createCard({ data: { title: formValues.title, listId: listData.id || 0, order: listData.cardIDs.length } }))
  }

  return (
    <Draggable draggableId={`list-${listData.id}`} index={index}>
      {(provided, snapshot) => (
        <Box sx={{ bgcolor: 'white', borderRadius: '10px', flex: '350px 0 0', height: 'fit-content', mr: 2, border: '1px solid gray' }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'whitesmoke', borderRadius: '10px 10px 0 0', borderBottom: '1px solid gray' }} {...provided.dragHandleProps}>
            <Typography color='primary' sx={{ p: 1, fontSize: '18px', fontFamily: 'Poppins', fontWeight: '600' }}>{listData.title}</Typography>
            {/* TODO: handle listID loading state */}
            <ListMenu listID={listData.id ? listData.id : 0} />
          </Box>
          <Droppable droppableId={String(listData.id)}>
            {(provided, snapshot) =>
              <Box sx={{ flex: 1, borderRadius: '0 0 10px 10px', display: 'flex', flexDirection: 'column', minHeight: '135px' }}
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
            {/* TODO: handle listID loading state */}
            <CreateCardForm onSubmit={handleCreateCard} />
          </Box>
        </Box>
      )}
    </Draggable>
  )
}