import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material"
import { useState } from "react"

type IMenuItem = {
  title: string
  icon: React.FC
  onSelect: () => void
}

type CreateMenuProps = {
  items: IMenuItem[]
  menuIcon: React.FC
}

export const CreateMenu: React.FC<CreateMenuProps> = (props) => {
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
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.menuIcon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList>
          {
            props.items.map(item => {
              return (
                <MenuItem onClick={item.onSelect}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </MenuItem>
              )
            })
          }
        </MenuList>
      </Menu>
    </Box>
  )
}