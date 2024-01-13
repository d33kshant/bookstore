"use client"

import { Box, Button, Chip, Divider, IconButton, Paper, Rating, Typography } from "@mui/material";
import AppBar from "@/app/components/AppBar";
import { useEffect, useState } from "react";
import { Book } from "@prisma/client";
import { AddShoppingCart, BookmarkAddOutlined, Refresh, Star } from "@mui/icons-material";
import Carousel from "@/app/components/Carousel";

export default function BookPage({ params }: { params: { id: string } }) {

  const [book, setBook] = useState<Book | null>(null)

  const [recommends, setRecommends] = useState<Book[]>([])
  const [page, setPage] = useState(1)
  const [step, setStep] = useState(0)
  const [maxSteps, setMaxSteps] = useState(0)

  useEffect(() => {
    const fetchBook = async () => {
      const base = new URL(window.location.origin + '/api/books/' + params.id)

      const response = await fetch(base)
      const book = await response.json()

      if (book) setBook(book)

    }
    fetchBook()
  }, [])

  useEffect(() => {
    const fetchRecommends = async () => {
      const base = new URL(window.location.origin + '/api/recommend')
      base.searchParams.set("id", params.id)
      base.searchParams.set("page", page + '')

      const response = await fetch(base)
      const data = await response.json()

      if (data) {
        setRecommends(data.books)
        setMaxSteps(data.books.length)
        setStep(0)
      }
    }
    fetchRecommends()
  }, [page])

  const recommendNext = () => setPage(prev => prev + 1)

  const nextBook = () => {
    setStep(prev => {
      if (prev === maxSteps - 1) return 0
      else return prev + 1
    })
  }

  const prevBook = () => {
    setStep(prev => {
      if (prev === 0) return maxSteps - 1
      else return prev - 1
    })
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      <Paper>
        <Box>
          <Box padding={2} gap={2} display="flex" flexDirection="column" alignItems="center">
            <Paper>
              <img className="h-72 rounded" src={book?.thumbnail} alt={book?.title} />
            </Paper>
            <Box display="flex" alignItems="center" gap={1}>
              {book?.selling_price !== book?.original_price && <Typography fontWeight={400} variant="h6" sx={{ textDecoration: "line-through" }} color="gray">${book?.original_price}</Typography>}
              <Typography variant="h6" flex={1} fontWeight={500}>${book?.selling_price}</Typography>
              {book && book?.selling_price !== book?.original_price && <Typography color="green" variant="h6">{(((book.original_price - book.selling_price) / book.original_price) * 100).toFixed(1)}% off</Typography>}
            </Box>
            <Box display="flex" gap={1}>
              <Button variant="contained" color="success" startIcon={<BookmarkAddOutlined />}>Save For Later</Button>
              <Button variant="contained" color="secondary" startIcon={<AddShoppingCart />}>Add To Cart</Button>
            </Box>
          </Box>
          <Divider />
          <Box padding={2}>
            <Typography>{book?.authors.replaceAll(';', ", ")}</Typography>
            <Typography variant="h4">{book?.title}</Typography>
            <Box mt={1} display="flex" gap={1} alignItems="center">
              <Rating readOnly value={book?.average_rating || 0} />
              <Typography>{book?.average_rating.toFixed(1)} ({book?.ratings_count}) • {book?.published_year}</Typography>
            </Box>
            <Box display="flex" gap={1} mt={2}>
              {book?.categories.replaceAll(" & ", ', ').split(',').map((category, key) => <Chip key={key} size="small" label={category} />)}
            </Box>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" padding={2} gap={1}>
            <Typography textTransform="uppercase" variant="h6">Description</Typography>
            <Typography>{book?.description}</Typography>
          </Box>
        </Box>
      </Paper>
      {recommends.length > 0 && <Carousel
        onNextClick={nextBook}
        onBackClick={prevBook}
        title="Recommended Readings"
        steps={maxSteps}
        activeStep={step}
        header={
          <Box px={2} py={1} display="flex" alignItems="center">
            <Typography flex={1} textTransform="uppercase" variant="h6">Recommended Readings</Typography>
            <IconButton size="small" onClick={recommendNext}>
              <Refresh />
            </IconButton>
          </Box>
        }
      >
        <Box component="a" href={`/book/${recommends[step].id}`} height="100%" display="flex" flexDirection="column" textAlign="center" justifyContent="center" alignItems="center" gap={2}>
          <Paper sx={{ overflow: "hidden" }}>
            <img className="w-fit h-40" src={recommends[step].thumbnail} alt={recommends[step].title} />
          </Paper>
          <Box>
            <Typography fontWeight={500}>{recommends[step].title}</Typography>
            <Typography color="gray">{recommends[step].categories}</Typography>
          </Box>
          <Box color="gray" display="flex" gap={1}>
            <Star fontSize="small" color="action" />
            <Typography color="inherit">{recommends[step].average_rating}</Typography>
            <Typography color="inherit">({recommends[step].ratings_count})</Typography>
          </Box>
        </Box>
      </Carousel>}
    </Box>
  )
}