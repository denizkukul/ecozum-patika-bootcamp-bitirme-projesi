import { Box } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from '../Card/Card';
import { Card as MuiCard } from '@mui/material';
import { CreateCard } from './CreateCard';
import { useAppSelector } from '../../hooks/useAppSelector';
import { listDropableStyle, listStyle } from './List.styles';
import { ListHeader } from './ListHeader';

type ListProps = {
  index: number
  listID: number
  isOwner: boolean
}

export const List: React.FC<ListProps> = ({ index, listID, isOwner }) => {
  const list = useAppSelector(state => state.app.lists[listID]);

  if (isOwner) {
    return (
      <Draggable draggableId={`list-${list.id}`} index={index}>
        {(provided) => (
          <MuiCard elevation={2} sx={listStyle} {...provided.draggableProps} ref={provided.innerRef}>
            <ListHeader listID={listID} isOwner={isOwner} dragHandleProps={provided.dragHandleProps} />
            <Droppable droppableId={String(list.id)}>
              {(provided) =>
                <Box sx={listDropableStyle} ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    list.cardIDs.map((cardID, index) => {
                      return <Card key={cardID} index={index} cardID={cardID} />
                    })
                  }
                  {provided.placeholder}
                </Box>
              }
            </Droppable>
            <CreateCard listID={listID} />
          </MuiCard>
        )}
      </Draggable>
    )
  }

  else { // If current user is not the board owner disable list dragging
    return (
      <MuiCard elevation={2} sx={listStyle}>
        <ListHeader listID={listID} isOwner={isOwner} />
        <Droppable droppableId={String(list.id)}>
          {(provided) =>
            <Box sx={listDropableStyle} ref={provided.innerRef} {...provided.droppableProps}>
              {
                list.cardIDs.map((cardID, index) => {
                  return <Card key={cardID} index={index} cardID={cardID} />
                })
              }
              {provided.placeholder}
            </Box>
          }
        </Droppable>
        <CreateCard listID={listID} />
      </MuiCard>
    )
  }

}