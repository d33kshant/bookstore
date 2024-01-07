"use client"
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Category, Home, Search } from "@mui/icons-material";

export default function SearchDrawer() {
  return (
    <Drawer open variant="permanent" anchor="left">
      <Box sx={{ width: 250 }}>
        <Toolbar variant="dense" />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText>Search</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}