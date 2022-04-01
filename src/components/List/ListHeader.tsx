import { Box, CardHeader as MuiCardHeader } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ListMenu } from './ListMenu';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { listHeaderStyle } from './List.styles';
import { ListEdit } from './ListEdit';
import { updateList } from '../../store/lists/listActions';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type ListHeaderProps = {
  listID: number
  dragHandleProps?: DraggableProvidedDragHandleProps
  isOwner: boolean
}

export const ListHeader: React.FC<ListHeaderProps> = ({ listID, dragHandleProps, isOwner }) => {
  const list = useAppSelector(state => state.app.lists[listID]);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const headerRef = useRef<null | HTMLElement>(null);

  const startEdit = () => {
    setEditing(true);
  }

  const saveEdit = (value: string) => {
    dispatch(updateList({ listID: list.id, data: { title: value } }));
    setEditing(false);
  }

  const cancelEdit = () => {
    setEditing(false);
  }

  return (
    <Box ref={headerRef}>
      <ListEdit title={list.title} open={editing} anchor={headerRef.current!} saveEdit={saveEdit} cancelEdit={cancelEdit} />
      <MuiCardHeader
        // If current user is not the board owner disable edit or deleting lists
        action={isOwner && <ListMenu listID={list.id} startEdit={startEdit} />}
        title={list.title}
        {...dragHandleProps}
        sx={listHeaderStyle}
      />
    </Box>
  )
}