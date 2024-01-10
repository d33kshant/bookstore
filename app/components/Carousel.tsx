"use client"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Divider, IconButton, MobileStepper, Paper, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string,
  steps: number,
  activeStep: number,
  children: React.ReactNode,
  header?: React.ReactNode,
  onNextClick: ()=>void,
  onBackClick: ()=>void,
}

export default function Carousel({ title, steps, activeStep, header, children, onNextClick, onBackClick }: Props) {
  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box>
        {header ? header : <Box py={1} px={2}>
          <Typography variant="h6" textTransform="uppercase">{title}</Typography>
        </Box>}
        <Divider />
        <Box height={300}>
          {children}
        </Box>
      </Box>
      <Box>
        <Divider />
        <MobileStepper
          variant="dots"
          position="static"
          steps={steps}
          activeStep={activeStep}
          nextButton={
            <IconButton onClick={onNextClick}>
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton onClick={onBackClick}>
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      </Box>
    </Paper>
  )
}