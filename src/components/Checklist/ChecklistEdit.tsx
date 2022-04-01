import { useState } from 'react';
import { Box, IconButton, Input, Popover } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { editFormStyle, editInputStyle } from './Checklist.style';

type ListEditProps = {
  anchor: HTMLElement
  open: boolean
  title: string
  cancelEdit: () => void
  saveEdit: (title: string) => void
}

export const ChecklistEdit: React.FC<ListEditProps> = ({ title, anchor, open, cancelEdit, saveEdit }) => {
  const [newTitle, setNewTitle] = useState(title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle) {
      saveEdit(newTitle)
    }
    else {
      handleCancelEdit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewTitle(e.target.value);
  }

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
    e.target.select();
  }

  const handleCancelEdit = () => {
    cancelEdit();
    setNewTitle(title);
  }

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={handleCancelEdit}
      anchorOrigin={{ vertical: 'center', horizontal: 'left', }}
      transformOrigin={{ vertical: 'center', horizontal: -30, }}
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
  );
}
