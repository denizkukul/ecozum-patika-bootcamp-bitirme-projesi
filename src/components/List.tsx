import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { CreateCardRequest } from '../services/server/controllers/card';
import { createCard, deleteList, selectCardsData } from '../store/appdataSlice';
import { List as ListProps } from '../store/appdataSlice';
import { Card } from './Card';
import { CreateCardForm } from './CreateCardForm';

type Props = ListProps & {
  index: number;
}

export const List: React.FC<Props> = ({ index, ...listData }) => {
  const cards = useAppSelector(selectCardsData);
  const dispatch = useAppDispatch();
  const handleCreateCard = (formValues: CreateCardRequest) => {
    dispatch(createCard(formValues))
  }

  const handleDeleteList = (id: number) => {
    dispatch(deleteList({ id }))
  }

  return (
    <Draggable draggableId={`list-${listData.id}`} index={index}>
      {(provided, snapshot) => (
        <div className={`list ${snapshot.isDragging ? 'dragging' : ''}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='list-title' {...provided.dragHandleProps}>{listData.title} <button onClick={() => handleDeleteList(listData.id)}>Delete</button></div>
          <Droppable droppableId={String(listData.id)}>
            {(provided, snapshot) =>
              <div className={`cards-container ${snapshot.isDraggingOver ? 'draggingover' : ''}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  listData.cardIDs.map((cardID, index) => {
                    return <Card key={cardID} index={index} {...cards[cardID]} />
                  })
                }
                {provided.placeholder}
                <CreateCardForm onSubmit={handleCreateCard} listID={listData.id} />
              </div>
            }
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}