import { useState } from 'react';
import { Box, IconButton, Input, Popover } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { editFormStyle, editInputStyle } from './Board.style';

type BoardEditProps = {
  anchor: HTMLElement
  open: boolean
  title: string
  cancelEdit: () => void
  saveEdit: (title: string) => void
}

export const BoardEdit: React.FC<BoardEditProps> = ({ title, anchor, open, cancelEdit, saveEdit }) => {
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
      anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
      transformOrigin={{ vertical: 'top', horizontal: 'center', }}
      elevation={0}
      sx={{ '.MuiPaper-root': { borderRadius: '0px' }, top: '0px !important' }}
    >
      <Box component='form' sx={editFormStyle} onSubmit={handleSubmit}>
        <Input autoFocus disableUnderline sx={editInputStyle} value={newTitle} onChange={handleChange} onFocus={handleFocus} />
        <IconButton type='submit'><SaveOutlinedIcon sx={{ color: 'white' }} /></IconButton>
        <IconButton onClick={handleCancelEdit}><CancelOutlined sx={{ color: 'white' }} /></IconButton>
      </Box>
    </Popover >
  );
}
