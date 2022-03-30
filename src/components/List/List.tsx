import { Box } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createCard } from '../../store/cards/cardActions';
import { Card } from '../Card/Card';
import { Card as MuiCard } from '@mui/material';
import { CreateCard } from './CreateCard';
import { ListMenu } from './ListMenu';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { listDropableStyle, listHeaderStyle, listStyle } from './List.styles';
import { ListEdit } from './ListEdit';
import { ListHeader } from './ListHeader';

type ListProps = {
  index: number
  listID: number
}

export const List: React.FC<ListProps> = ({ index, listID }) => {
  const list = useAppSelector(state => state.app.lists[listID]);

  return (
    <Draggable draggableId={`list-${list.id}`} index={index}>
      {(provided) => (
        <MuiCard elevation={2} sx={listStyle} {...provided.draggableProps} ref={provided.innerRef}>
          <ListHeader listID={listID} dragHandleProps={provided.dragHandleProps} />
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