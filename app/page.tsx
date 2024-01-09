"use client"
import { Box, Divider, IconButton, MobileStepper, Paper, Typography } from "@mui/material"
import { BookmarkAddOutlined, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import AppBar from "@/app/components/AppBar"
import { useState } from "react"

export default function Home() {
  const MAX_STEP = 4
  const [step, setStep] = useState(0)

  const nextStep = () => setStep(prev => Math.min(prev + 1, MAX_STEP-1))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0))

  return (
    <Box>
      <AppBar />
      <Box display="flex" justifyContent="center">
        <Box width="100%" maxWidth={800} display="flex" flexDirection="column" p={2} gap={2}>
          <Paper sx={{overflow: "hidden"}}>
            <Box>
              <Box py={1} px={2}>
                <Typography variant="h6" textTransform="uppercase">Top Offers</Typography>
              </Box>
              <Divider />
              <Box height={300}>

              </Box>
            </Box>
            <Box>
              <Divider />
              <MobileStepper
                variant="dots"
                position="static"
                activeStep={step}
                steps={MAX_STEP}
                nextButton={
                  <IconButton onClick={nextStep}>
                    <KeyboardArrowRight />
                  </IconButton>
                }
                backButton={
                  <IconButton onClick={prevStep}>
                    <KeyboardArrowLeft />
                  </IconButton>
                }
              />
            </Box>
          </Paper>
          <Paper sx={{overflow: "hidden"}}>
            <Box>
              <Box py={1} px={2}>
                <Typography variant="h6" textTransform="uppercase">For You</Typography>
              </Box>
              <Divider />
              <Box height={300} gap={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <BookmarkAddOutlined color="action" fontSize="large" />
                <Typography textAlign="center" maxWidth={210} color="gray">Add or purchase some book to get recommendation</Typography>
              </Box>
            </Box>
          </Paper>
          <Paper sx={{overflow: "hidden"}}>
            <Box>
              <Box py={1} px={2}>
                <Typography variant="h6" textTransform="uppercase">Top Readings</Typography>
              </Box>
              <Divider />
              <Box height={300}>

              </Box>
            </Box>
            <Box>
              <Divider />
              <MobileStepper
                variant="dots"
                position="static"
                activeStep={step}
                steps={MAX_STEP}
                nextButton={
                  <IconButton onClick={nextStep}>
                    <KeyboardArrowRight />
                  </IconButton>
                }
                backButton={
                  <IconButton onClick={prevStep}>
                    <KeyboardArrowLeft />
                  </IconButton>
                }
              />
            </Box>
          </Paper>
          <Paper>
            <Box href="/search" component="a" display="flex" p={2}>
              <Typography fontWeight={500} flex={1}>Explore all books</Typography>
              <KeyboardArrowRight />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )    
}
