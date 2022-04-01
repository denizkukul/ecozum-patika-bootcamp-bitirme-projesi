import { useState } from 'react';
import { Box, IconButton, Input, Popover } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';
import { editFormStyle, editInputStyle } from './List.styles';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

type ListEditProps = {
  anchor: HTMLElement
  open: boolean
  title: string
  cancelEdit: () => void
  saveEdit: (title: string) => void
}

export const ListEdit: React.FC<ListEditProps> = ({ title, anchor, open, cancelEdit, saveEdit }) => {
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
      anchorOrigin={{ vertical: 'center', horizontal: 'center', }}
      transformOrigin={{ vertical: 'center', horizontal: 'center', }}
      elevation={0}
      sx={{ '.MuiPaper-root': { borderRadius: '4px 4px 0 0' } }}
    >
      <Box component='form' onSubmit={handleSubmit} sx={editFormStyle}>
        <Input sx={editInputStyle} autoFocus disableUnderline fullWidth name='title' placeholder='List Title' value={newTitle} onChange={handleChange} onFocus={handleFocus} />
        <IconButton color='secondary' sx={{ flex: '40px 0 0' }} type='submit'>
          <SaveOutlinedIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton color='secondary' sx={{ flex: '40px 0 0' }} onClick={handleCancelEdit}>
          <CancelOutlined sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    </Popover >
  );
}
