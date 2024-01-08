"use client"

import { Box, Button, Chip, Divider, IconButton, Paper, Rating, Typography } from "@mui/material";
import AppBar from "@/app/components/AppBar";
import { useEffect, useState } from "react";
import { Book } from "@prisma/client";
import { AddShoppingCart, BookmarkAddOutlined, Refresh } from "@mui/icons-material";

export default function BookPage({ params }: { params: { id: string } }) {

  const [book, setBook] = useState<Book | null>(null)
  
  const [recommends, setRecommends] = useState<Book[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchBook = async () => {
      const base = new URL('http://localhost:3000/api/books')
      base.searchParams.set("id", params.id)

      const response = await fetch(base)
      const book = await response.json()

      if (book) setBook(book)
      
    }
    fetchBook()
  }, [])

  useEffect(() => {
    const fetchRecommends = async () => {
      const base = new URL('http://localhost:3000/api/recommend')
      base.searchParams.set("id", params.id)
      base.searchParams.set("page", page+'')

      const response = await fetch(base)
      const data = await response.json()

      if (data) setRecommends(data.books)
    }
    fetchRecommends()
  }, [page])

  const recommendNext = () => setPage(prev => prev + 1)

  return (
    <Box>
      <AppBar />
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" maxWidth={800} width="100%" padding={2} gap={2}>
          <Paper>
            <Box>
              <Box padding={2} gap={2} display="flex" flexDirection="column" alignItems="center">
                <Paper>
                  <img className="h-72 rounded" src={book?.thumbnail} alt={book?.title} />
                </Paper>
                <Box display="flex" gap={1}>
                  <Button variant="contained" color="success" startIcon={<BookmarkAddOutlined />}>Save For Later</Button>
                  <Button variant="contained" color="secondary" startIcon={<AddShoppingCart />}>Add To Cart</Button>
                </Box>
              </Box>
              <Divider />
              <Box padding={2}>
                <Typography>{book?.authors.replaceAll(';', ", ")}</Typography>
                <Typography variant="h4">{book?.title}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  {book?.selling_price !== book?.original_price && <Typography fontWeight={400} variant="h6" sx={{ textDecoration: "line-through" }} color="gray">${book?.original_price}</Typography>}
                  <Typography variant="h6" flex={1} fontWeight={500}>${book?.selling_price}</Typography>
                </Box>
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
          <Paper>
            <Box>
              <Box px={2}  py={1} display="flex" alignItems="center">
                <Typography flex={1} textTransform="uppercase" variant="h6">Recommended Readings</Typography>
                <IconButton size="small" onClick={recommendNext}>
                  <Refresh />
                </IconButton>
              </Box>
              <Divider />
              <Box p={2} gap={1} display="flex" flexDirection="column">
                {recommends.map(book => <Typography>• {book.title}</Typography>)}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}