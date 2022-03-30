import { useState } from 'react';
import { Box, Button, IconButton, Popover, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import EventIcon from '@mui/icons-material/Event';
import format from 'date-fns/format';
import { updateCard } from '../../store/cards/cardActions';
import { duedateFormContStyle, duedateFormStyle } from './CardModal.style';

type SetDuedateProps = {
  cardID: number
}

export const SetDuedate: React.FC<SetDuedateProps> = ({ cardID }) => {
  const card = useAppSelector(state => state.app.cards[cardID]);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<Date | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSetDuedate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return
    dispatch(updateCard({ cardID, data: { duedate: format(value, 'yyyy-MM-dd') } }))
    handleClose();
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        color='secondary'
      >
        <EventIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{ mt: 1 }}
      >
        <Box component='form' onSubmit={handleSetDuedate} sx={duedateFormStyle}>
          <Box sx={duedateFormContStyle}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Duedate'
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button type='submit' sx={{ my: 1 }} >Set Duedate</Button>
          </Box>
        </Box>
      </Popover >
    </Box >
  );
}
