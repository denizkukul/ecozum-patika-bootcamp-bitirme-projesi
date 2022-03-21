import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { Card as CardProps, deleteCard } from '../store/appdataSlice';

type Props = CardProps & {
  index: number
}

export const Card: React.FC<Props> = ({ index, ...cardData }) => {
  const dispatch = useAppDispatch();
  const handleDeleteCard = (id: number) => {
    dispatch(deleteCard({ id }))
  }

  return (
    <Draggable draggableId={String(cardData.id)} index={index}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div style={{ padding: '10px', backgroundColor: 'transparent' }}>
            <div className={`card ${snapshot.isDragging ? 'dragging' : ''}`} >
              <div className='card-title' {...provided.dragHandleProps}>{cardData.title}<button onClick={() => handleDeleteCard(cardData.id)}>Delete</button></div>
              {cardData.description && <div>{cardData.description}</div>}
              {cardData.duedate && <div>DueDate: {cardData.duedate}</div>}
              {cardData.checklists && <div>Checklists: {cardData.checklists}</div>}
              {cardData.labels && <div>Labels: {cardData.labels}</div>}
              {cardData.comments && <div>{cardData.comments}</div>}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}