import { Grid } from "@mui/material"
import React from "react"

export default function BookGrid({ children }: { children: React.ReactNode }) {
  return (
    <Grid container spacing={2} sx={{ padding: 2, maxWidth: 800, height: "100%" }}>
      {children}
    </Grid>
  )
}