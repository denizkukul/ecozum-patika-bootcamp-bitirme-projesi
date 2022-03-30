import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Add, Delete, Edit, Label, LabelOutlined, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Button, Checkbox, Chip, Icon, IconButton, Menu } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addLabel, removeLabel } from '../../store/cards/cardActions';

type AddLabelMenuProps = {
  cardID: number
}


export const AddLabelMenu: React.FC<AddLabelMenuProps> = ({ cardID }) => {
  const card = useAppSelector(state => state.app.cards[cardID]);
  const labelTypes = useAppSelector(state => state.app.labelTypes);
  const dispatch = useAppDispatch();
  const currentLabels = card.labels;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (arg: { labelId: number, cardLabelID?: number }) => {
    if (arg.cardLabelID) {
      dispatch(removeLabel({ cardLabelID: arg.cardLabelID, cardID }))
    }
    else {
      dispatch(addLabel({ data: { cardId: cardID, labelId: arg.labelId } }))
    }
  }

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='secondary'
      >
        <LabelOutlined sx={{ color: 'white' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          {
            labelTypes.map((labelType, index) => {
              const cardLabelID = currentLabels.find(label => label.id === labelType.id)?.CardLabel.id
              return (
                <MenuItem key={index} onClick={() => handleSelect({ labelId: labelType.id, cardLabelID })} >
                  <Checkbox checked={Boolean(cardLabelID)} />
                  <ListItemText>{labelType.title}</ListItemText>
                  <ListItemIcon>
                    <Label sx={{ color: labelType.color }} fontSize="small" />
                  </ListItemIcon>
                </MenuItem>
              )
            })
          }
        </MenuList>
      </Menu>
    </Box>
  );
}
