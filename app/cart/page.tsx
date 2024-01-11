"use client"
import { Box, Divider, Paper, Typography } from "@mui/material"
import AppBar from "@/app/components/AppBar"

export default function CartPage() {
  return (
    <Box>
      <AppBar />
      <Box display="flex" justifyContent="center">
        <Box width="100%" maxWidth={800} p={2}>
          <Paper>
            <Box display="flex" flexDirection="column">
              <Box px={2} py={1}>
                <Typography textTransform="uppercase" variant="h6">Cart (3)</Typography>
              </Box>
              <Divider />
              <Box p={2}></Box>
            </Box>
          </Paper> 
        </Box>
      </Box>
    </Box>
  )
}