import { useState } from 'react';
import { Box, Button, Checkbox, Chip, Icon, IconButton, Menu, Popover, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks/useAppDispatch';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';


export const MembersMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'members' : undefined}
        aria-describedby={open ? "members" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='secondary'
      >
        <GroupOutlinedIcon fontSize="small" />
      </IconButton>
      <Popover
        id={open ? "members" : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        sx={{ mt: 1, height: '300px', width: '200px' }}
      >
        <Typography>Content</Typography>
      </Popover >
    </Box >
  );
}
