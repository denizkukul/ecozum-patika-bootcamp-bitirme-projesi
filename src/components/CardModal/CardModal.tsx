import Modal from '@mui/material/Modal/Modal';
import Typography from '@mui/material/Typography/Typography';
import MuiCard from '@mui/material/Card/Card';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AddLabel } from './AddLabel';
import { CardActions, CardContent, CardHeader, Dialog, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { CreateChecklist } from './CreateChecklistMenu';
import { SetDuedate } from './SetDuedate';
import { cardTitleStyle, modalContainerStyle, modalContentStyle, modalHeaderStyle, modalStyle } from './CardModal.style';
import { Labels } from './Labels';
import { Checklists } from './Checklists';
import { Comments } from './Comments';
import { CardUpdates } from './CardUpdates';

type CardModalProps = {
  cardID: number
  open: boolean
  close: () => void
}

export const CardModal: React.FC<CardModalProps> = ({ cardID, open, close }) => {
  const card = useAppSelector(state => state.app.cards[cardID]);

  return (
    <Dialog sx={modalContainerStyle} open={open} onClose={close}>
      <MuiCard sx={modalStyle} variant='outlined'>
        <CardHeader
          sx={modalHeaderStyle}
          action={
            <CardActions sx={{ flex: 1 }}>
              <SetDuedate cardID={cardID} />
              <CreateChecklist cardID={cardID} />
              <AddLabel cardID={cardID} />
              <IconButton onClick={close} color='secondary' sx={{ '&.MuiButtonBase-root': { ml: 'auto' } }}>
                <Close />
              </IconButton>
            </CardActions>
          }
        />
        <CardContent sx={modalContentStyle}>
          <Typography sx={cardTitleStyle} >{card.title}</Typography>
          <CardUpdates cardID={cardID} title={card.title} description={card.description} />
          <Labels cardID={cardID} cardLabels={card.labels} />
          <Checklists checklistIDs={card.checklistIDs} />
          <Comments cardID={cardID} comments={card.comments} />
        </CardContent>
      </MuiCard>
    </Dialog >
  )
}