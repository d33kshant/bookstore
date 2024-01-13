import { CreditCard, EventNote, Home, LocalAtm, MenuBook, MonetizationOn, Search, Star, StarHalf, Stars, ThumbsUpDown } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, SwipeableDrawer, Toolbar, Typography } from "@mui/material";

interface Props {
  open: boolean,
  onClose: ()=>void,
  onOpen: ()=>void,
}

export default function AppDrawer({ open, onClose, onOpen }: Props) {
  return (
    <SwipeableDrawer onOpen={onOpen} open={open} onClose={onClose}>
      <Box minWidth={300}>
        <Toolbar />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader>Explore</ListSubheader>
          }
        >
          <ListItemButton href="/search?sort=average_rating-desc">
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="All Books" />
          </ListItemButton>
          <ListItemButton href="/search?sort=average_rating-desc">
            <ListItemIcon>
              <Stars />
            </ListItemIcon>
            <ListItemText primary="Top Rated" />
          </ListItemButton>
          <ListItemButton href="/search?sort=published_year-desc">
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText primary="New Release" />
          </ListItemButton>
          <ListItemButton href="/search?sort=selling_price-asc">
            <ListItemIcon>
              <LocalAtm />
            </ListItemIcon>
            <ListItemText primary="Low Price" />
          </ListItemButton>
        </List>
        <List
          subheader={
            <ListSubheader>About</ListSubheader>
          }
        >
          <Box px={2} maxWidth={280}>
            <Typography variant="body2">
              BookStore is an online book store where you can buy books and get recommendation for new readings. This is a dummy website you can not realy buy books from here.
            </Typography>
            <Typography color="royalblue" variant="caption" component="a" href="https://github.com/d33kshant/bookstore">GitHub Repository</Typography>
          </Box>
        </List>
      </Box>
    </SwipeableDrawer>
  )
}