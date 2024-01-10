"use client"
import { Box, Divider, IconButton, MobileStepper, Paper, Rating, Typography, ratingClasses } from "@mui/material"
import { BookmarkAddOutlined, KeyboardArrowLeft, KeyboardArrowRight, Star } from "@mui/icons-material"
import AppBar from "@/app/components/AppBar"
import { useEffect, useState } from "react"
import { Book, Offer } from "@prisma/client"
import Carousel from "./components/Carousel"

export default function Home() {
  const [step, setStep] = useState(0)
  const [maxSteps, setMaxSteps] = useState(1)
  const [topBooks, setTopBooks] = useState<Book[]>([])

  const [stepOffer, setStepOffer] = useState(0)
  const [maxStepsOffer, setMaxStepsOffer] = useState(1)
  const [offers, setOffers] = useState<Offer[]>([])

  useEffect(() => {
    const fetchTopBooks = async () => {
      const base = new URL(window.location.origin + '/api/books/top')
      const response = await fetch(base)
      const data = await response.json()
      if (data.books) {
        setTopBooks(data.books)
        setMaxSteps(data.books.length)
      }
    }
    fetchTopBooks()
  }, [])

  useEffect(() => {
    const fetchOffers = async () => {
      const base = new URL(window.location.origin + '/api/offers')
      const response = await fetch(base)
      const data = await response.json()
      if (data.offers) {
        setOffers(data.offers)
        setMaxStepsOffer(data.offers.length)
      }
    }
    fetchOffers()
  }, [])

  const nextStep = () => setStep(prev => Math.min(prev + 1, maxSteps-1))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0))

  const nextOffer = () => setStepOffer(prev => Math.min(prev + 1, maxStepsOffer-1))
  const prevOffer = () => setStepOffer(prev => Math.max(prev - 1, 0))

  return (
    <Box>
      <AppBar />
      <Box display="flex" justifyContent="center">
        <Box width="100%" maxWidth={800} display="flex" flexDirection="column" p={2} gap={2}>
          {offers.length > 0 && 
          <Paper sx={{ overflow: "hidden", position: "relative", height: 300 }}>
            <IconButton onClick={prevOffer} sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}>
              <KeyboardArrowLeft color="action" />
            </IconButton>
            <Box height="100%">
              <Box component="a" href={offers[stepOffer].href} height="100%" display="flex" alignItems="center" justifyContent="center">
                <img className="h-full object-cover" src={offers[stepOffer].banner} />
              </Box>
            </Box>
            <IconButton onClick={nextOffer} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}>
              <KeyboardArrowRight color="action" />
            </IconButton>
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex gap-1">
              {Array(maxStepsOffer).fill(0).map((_, key) => <div key={key} className={`w-[6px] h-[6px] rounded bg-white ${key === stepOffer ? "opacity-100" : "opacity-50"}`} ></div>)}
            </div>
          </Paper>}
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
          {topBooks.length > 0 && <Carousel title="Top Readings" steps={maxSteps} activeStep={step} onBackClick={prevStep} onNextClick={nextStep}>
            <Box component="a" href={`/book/${topBooks[step].id}`} height="100%" display="flex" flexDirection="column" textAlign="center" justifyContent="center" alignItems="center" gap={2}>
              <Paper sx={{ overflow: "hidden" }}>
                <img className="w-fit h-40" src={topBooks[step].thumbnail} alt={topBooks[step].title} />
              </Paper>
              <Box>
                <Typography fontWeight={500}>{topBooks[step].title}</Typography>
                <Typography color="gray">{topBooks[step].categories}</Typography>
              </Box>
              <Box color="gray" display="flex" gap={1}>
                <Star fontSize="small" color="action" />
                <Typography color="inherit">{topBooks[step].average_rating}</Typography>
                <Typography color="inherit">({topBooks[step].ratings_count})</Typography>
              </Box>
            </Box>
          </Carousel>}
          <Paper>
            <Box href="/search" component="a" display="flex" p={2}>
              <Typography fontWeight={500} flex={1}>Explore all books</Typography>
              <KeyboardArrowRight color="action" />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )    
}
