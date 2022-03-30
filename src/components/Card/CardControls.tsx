import CardActions from '@mui/material/CardActions/CardActions';
import IconButton from '@mui/material/IconButton/IconButton';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteCard } from '../../store/cards/cardActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Delete } from '@mui/icons-material';
import { CardModal } from '../CardModal/CardModal';

type CardControlsProps = {
  cardID: number
}

export const CardControls: React.FC<CardControlsProps> = ({ cardID }) => {
  const [cardModalStatus, setCardModalStatus] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteCard = () => {
    dispatch(deleteCard({ cardID }))
  }

  const openCardModal = () => {
    setCardModalStatus(true);
  }

  const closeCardModal = () => {
    setCardModalStatus(false);
  }

  return (
    <CardActions>
      <IconButton onClick={openCardModal}><VisibilityIcon /></IconButton>
      <IconButton sx={{ '&.MuiButtonBase-root': { ml: 'auto' } }} onClick={handleDeleteCard}><Delete /></IconButton>
      <CardModal cardID={cardID} open={cardModalStatus} close={closeCardModal} />
    </CardActions>
  )
}