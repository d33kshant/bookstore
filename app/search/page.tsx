"use client"
import React, { useEffect, useState } from "react"
import { Box, Pagination, Grid, Paper, Input, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel, Typography } from "@mui/material"
import BookCard from "@/app/components/BookCard"
import AppBar from "@/app/components/AppBar"
import { Book } from "@prisma/client"
import { useQueryState } from 'nuqs'
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const params = useSearchParams()
  const [books, setBooks] = useState<Book[]>([])
  const [count, setCount] = useState(1)
  const [match, setMatch] = useState(0)
  const [page, setPage] = useQueryState('page', { defaultValue: '1' })
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' })

  useEffect(() => {
    const fetchBooks = async () => {
      const base = new URL(window.location.origin + '/api/books')
      base.searchParams.set("sort", sort)
      base.searchParams.set("page", page)
      base.searchParams.set("query", params.get("query") || '')

      const response = await fetch(base.href)
      const data = await response.json()
      if (data) {
        setBooks(data.books)
        setCount(data.page_count)
        setMatch(data.match_count)
      }
    }
    fetchBooks()
  }, [page, sort])

  const onPageChange = (_: any, value: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setPage(value + '')
  }

  const onSortChange = (event: SelectChangeEvent) => {
    setPage('1')
    setSort(event.target.value)
  }

  return (
    <Box>
      <AppBar />
      <Box alignItems="center" padding={2} gap={2} margin="auto" sx={{ display: "flex", flexDirection: "column", maxWidth: 800, width: "100%", height: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <Box display="flex" p={1} gap={1} alignItems="center">
            <Typography fontWeight={500} flex={1}>{match} Items Found</Typography>
            <FormControl sx={{minWidth: 200}} size="small">
              <Select value={sort} onChange={onSortChange}>
                <MenuItem value="average_rating-desc">Rating High to Low</MenuItem>
                <MenuItem value="average_rating-asc">Rating Low to High</MenuItem>
                <MenuItem value="selling_price-desc">Price High to Low</MenuItem>
                <MenuItem value="selling_price-asc">Price Low to High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          {books.map(book => <BookCard key={book.id} {...book} />)}
        </Grid>
      </Box>
      <Box p={1} pb={4} display="flex" justifyContent="center">
        <Pagination count={count} page={+page} color="primary" onChange={onPageChange} />
      </Box>
    </Box>
  )
}
