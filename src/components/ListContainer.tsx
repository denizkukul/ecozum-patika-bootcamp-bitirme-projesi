import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { CreateListRequest } from "../services/server/controllers/list"
import { createList } from "../store/lists/listActions";
import { changeListOrder, changeCardOrder, moveCardToAnotherList } from "../store/app/miscActions"
import { CreateListForm } from "./CreateListForm"
import { List } from "./List/List"
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Box } from "@mui/material"

type ListContainerProps = {
  boardID: number;
  listIDs: number[]
}

export const ListContainer: React.FC<ListContainerProps> = ({ listIDs, boardID }) => {
  const lists = useAppSelector(state => state.app.lists);
  const dispatch = useAppDispatch();

  const handleCreateList = (formValues: { title: string }) => {
    dispatch(createList({ data: { title: formValues.title, boardId: boardID, order: listIDs.length } }))
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // Dropped out of container
    if (!destination) {
      return;
    }

    // Dropped on same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'list') { // Handle list drag-drop
      const newListIDs = Array.from(listIDs);

      newListIDs.splice(source.index, 1);
      newListIDs.splice(destination.index, 0, Number(draggableId.match(/[0-9]+$/)![0]));

      // TODO: This can me made more efficient
      dispatch(changeListOrder({ boardID, newListIDs }))
      return;
    }
    else { // Handle card drag-drop
      const sourceListID = Number(source.droppableId.match(/[0-9]+$/)![0])
      const targetListID = Number(destination.droppableId.match(/[0-9]+$/)![0])

      if (sourceListID === targetListID) { // Card dropped in same list
        const newCardIDs = Array.from(lists[sourceListID].cardIDs);

        newCardIDs.splice(source.index, 1);
        newCardIDs.splice(destination.index, 0, Number(draggableId.match(/[0-9]+$/)![0]));

        dispatch(changeCardOrder({ listID: sourceListID, newCardIDs }))
      }
      else { // Card dropped in another list
        const newSourceCardIDs = Array.from(lists[sourceListID].cardIDs)
        const newTargetCardIDs = Array.from(lists[targetListID].cardIDs)

        const cardID = newSourceCardIDs.splice(source.index, 1)[0];
        newTargetCardIDs.splice(destination.index, 0, cardID);

        dispatch(moveCardToAnotherList({ source: { listID: sourceListID, newCardIDs: newSourceCardIDs }, target: { listID: targetListID, newCardIDs: newTargetCardIDs } }))
      }

      return;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="list">
        {(provided, snapshot) => (
          <Box sx={{ overflow: 'auto', p: 2, pt: 3, height: '100%', display: 'flex', flex: 1, borderRadius: '10px' }}{...provided.droppableProps} ref={provided.innerRef}>
            {
              listIDs.map((listID, index) => {
                return <List key={listID} index={index} {...lists[listID]} />
              })
            }
            {provided.placeholder}
            <CreateListForm onSubmit={handleCreateList} />
          </Box>
        )}
      </Droppable>
    </DragDropContext >
  )
}

