import { CancelOutlined, Edit } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import Input from '@mui/material/Input/Input'
import Popover from '@mui/material/Popover/Popover'
import Typography from '@mui/material/Typography/Typography'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateChecklistItem } from '../../store/checklists/checklistActions'
import { ChecklistItem as ChecklistItemType } from '../../store/checklists/checklistsReducer'
import { editFormStyle, editInputStyle, itemContStyle, itemStyle } from './Checklist.style'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

type ListItemEditProps = {
  checklistID: number
  checklistItem: ChecklistItemType
}

export const ListItemEdit: React.FC<ListItemEditProps> = ({ checklistID, checklistItem }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [newTitle, setNewTitle] = useState(checklistItem.title);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewTitle(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle) {
      dispatch(updateChecklistItem({ checklistID, checklistItemID: checklistItem.id, data: { title: newTitle } }))
    }
    else {
      handleCancelEdit()
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
    e.target.select();
  }

  const handleCancelEdit = () => {
    setNewTitle(checklistItem.title);
    handleClose();
  }

  return (
    <Box display='flex' sx={itemContStyle} key={checklistItem.id}>
      <Box display='flex' sx={{ flex: 1 }}>
        <Typography sx={itemStyle} p={1} fontWeight={500}>{checklistItem.title}</Typography>
        <IconButton sx={{ mr: 1 }} onClick={handleClick}>
          <Edit />
        </IconButton>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 602,
        }}
        elevation={0}
      >
        <Box sx={editFormStyle} component='form' onSubmit={handleSubmit}>
          <Input autoFocus disableUnderline fullWidth name='title' placeholder='List Title' value={newTitle} onChange={handleChange} onFocus={handleFocus} sx={editInputStyle} />
          <IconButton color='secondary' sx={{ flex: '40px 0 0' }} type='submit'>
            <SaveOutlinedIcon sx={{ color: 'primary.main' }} />
          </IconButton>
          <IconButton color='secondary' sx={{ flex: '40px 0 0' }} onClick={handleCancelEdit}>
            <CancelOutlined sx={{ color: 'primary.main' }} />
          </IconButton>
        </Box>
      </Popover >
    </Box>
  )
}
