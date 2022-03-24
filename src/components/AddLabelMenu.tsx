import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Add, Delete, Edit, Label, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Button, Chip, Icon, IconButton, Menu } from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteList } from '../store/appdataSlice';
import { AddLabelRequest, LabelOptionResponse } from '../services/server/controllers/label';
import { useAppSelector } from '../hooks/useAppSelector';

type AddLabelMenuProps = {
  cardID: number
  handleAddLabel: (payload: AddLabelRequest) => void
}

export const AddLabelMenu: React.FC<AddLabelMenuProps> = ({ cardID, handleAddLabel }) => {
  const labelOptions = useAppSelector(state => state.appdata.labelOptions);
  const currentLabels = useAppSelector(state => state.appdata.cardsData[cardID].labels);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (payload: AddLabelRequest) => {
    handleClose();
    handleAddLabel(payload);
  }

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Add />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          {
            Object.keys(labelOptions).map(id => {
              if (currentLabels?.every(label => label.labelID !== Number(id))) {
                return (
                  <MenuItem key={id} onClick={() => handleSelect({ cardId: cardID, labelId: Number(id) })} >
                    <ListItemIcon>
                      <Label sx={{ color: labelOptions[Number(id)].color }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{labelOptions[Number(id)].title}</ListItemText>
                  </MenuItem>
                )
              }
            })
          }
        </MenuList>
      </Menu>
    </Box>
  );
}
