import { AppBar as AppBarMUI, Toolbar, IconButton, Typography, Badge, Box, Input, Paper } from "@mui/material"
import { BookmarkOutlined, Menu, Search, ShoppingCart } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import React, { useContext, useState } from "react"
import { StoreContext } from "@/app/contexts/StoreContext"

interface Props {
  onMenuClick?: ()=>void,
}

export default function AppBar({ onMenuClick }: Props) {

  const { state } = useContext(StoreContext)

  const params = useSearchParams()
  const [query, setQuery] = useState(params.get("query") || '')

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <AppBarMUI position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <IconButton onClick={onMenuClick} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
              <a href="/">BookStore</a>
            </Typography>
          </Box>
          <Paper sx={{ flex: 1, maxWidth: 400, ml: 2, mr: 1 }}>
          <Box action="/search" display="flex" alignItems="center" px={1} py={0.4} gap={1} component="form" borderRadius={1}>
            <Search color="action" />
            <Input value={query} onChange={onQueryChange} placeholder="Search a title" autoComplete="off" name="query" fullWidth disableUnderline/>
          </Box>
          </Paper>
          <Box display="flex" gap={2}>
            <IconButton href="/reading" edge="end" color="inherit">
              <BookmarkOutlined />
              <Badge color="error" badgeContent={state.readings.length} sx={{ top: -5, left: -5 }} />
            </IconButton>
            <IconButton href="/cart" edge="end" color="inherit">
              <ShoppingCart />
              <Badge color="error" badgeContent={state.cart.length} sx={{ top: -5, left: -5 }} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBarMUI>
  )
}