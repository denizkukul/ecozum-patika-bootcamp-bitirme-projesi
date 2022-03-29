import { Box, Button, CardHeader, ClickAwayListener, Divider, IconButton, Input, TextField, Typography } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createCard } from '../../store/cards/cardActions';
import { List as ListProps } from '../../store/lists/listsReducer';
import { Card } from '../Card/Card';
import { Card as MuiCard } from '@mui/material';
import { CreateCardForm } from '../CreateCardForm';
import { ListMenu } from '../ListMenu';
import { updateList } from '../../store/lists/listActions';
import { useState } from 'react';
import { CancelOutlined } from '@mui/icons-material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
type Props = ListProps & {
  index: number;
}

export const List: React.FC<Props> = ({ index, ...listData }) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState({ editing: false, newListTitle: listData.title });
  const handleCreateCard = (formValues: { title: string }) => {
    dispatch(createCard({ data: { title: formValues.title, listId: listData.id || 0, order: listData.cardIDs.length } }))
  }
  const startEdit = () => {
    setEdit(prev => { return { ...prev, editing: true } });
  }
  const saveEdit = () => {
    dispatch(updateList({ listID: listData.id, data: { title: edit.newListTitle } }));
    setEdit(prev => { return { ...prev, editing: false } });
  }
  const cancelEdit = () => {
    setEdit({ editing: false, newListTitle: listData.title });
  }

  return (
    <Draggable draggableId={`list-${listData.id}`} index={index}>
      {(provided, snapshot) => (
        <MuiCard elevation={2} sx={{ bgcolor: 'secondary.main', flex: '350px 0 0', height: 'fit-content', mr: 2 }}
          {...provided.draggableProps}
          ref={provided.innerRef}>
          {
            edit.editing ?
              <ClickAwayListener onClickAway={cancelEdit}>
                <Box component='form' sx={{ bgcolor: 'primary.main', height: '64px', p: 2, display: 'flex', alignItems: 'center' }} onSubmit={saveEdit}>
                  <Input onFocus={(e) => e.target.select()} autoFocus disableUnderline sx={{ color: 'primary.contrastText', fontSize: '20px', flex: 1, letterSpacing: 0 }} value={edit.newListTitle} onChange={(e) => setEdit({ editing: true, newListTitle: e.target.value })} />
                  <IconButton type='submit'><SaveOutlinedIcon sx={{ color: 'white' }} /></IconButton>
                  <IconButton onClick={cancelEdit}><CancelOutlined sx={{ color: 'white' }} /></IconButton>
                </Box>
              </ClickAwayListener> :
              <CardHeader
                action={<ListMenu listID={listData.id} startEdit={startEdit} />}
                title={listData.title}
                {...provided.dragHandleProps}
                sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '.MuiCardHeader-title': { fontSize: '20px' } }}
              />
          }
          <Droppable droppableId={String(listData.id)}>
            {(provided, snapshot) =>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '135px', p: 2, pb: 0 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  listData.cardIDs.map((cardID, index) => {
                    return <Card key={cardID} index={index} cardID={cardID} />
                  })
                }
                {provided.placeholder}
              </Box>
            }
          </Droppable>
          <Box mt='auto' borderTop='1px solid lightgray'>
            {/* TODO: handle listID loading state */}
            <CreateCardForm onSubmit={handleCreateCard} />
          </Box>
        </MuiCard>
      )}
    </Draggable>
  )
}