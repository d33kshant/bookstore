"use client"

import { Box, Button, Chip, Divider, IconButton, Paper, Rating, Skeleton, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Book } from "@prisma/client"
import { AddShoppingCart, BookmarkAddOutlined, Refresh, Star } from "@mui/icons-material"
import { CartContext } from "@/app/contexts/CartContext"
import { CartActionType } from "@/app/reducers/CartReducer"
import Carousel from "@/app/components/Carousel"
import { ToastContext } from "@/app/contexts/ToastContext"

export default function BookPage({ params }: { params: { id: string } }) {

  const { dispatch } = useContext(CartContext)
  const { toast } = useContext(ToastContext)

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

  const addToCart = () => {
    dispatch({ type: CartActionType.ADD, payload: { ...book } })
    toast("Book added to cart", "success")
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      <Paper>
        <Box>
          <Box padding={2} gap={2} display="flex" flexDirection="column" alignItems="center">
            { book ? 
            <Paper>
              <img className="h-72 rounded" src={book?.thumbnail} alt={book?.title} />
            </Paper> :
            <Skeleton variant="rounded" animation="wave" height={288} width={200} />
            }
            { book ? 
            <Box display="flex" alignItems="center" gap={1}>
              {book?.selling_price !== book?.original_price && <Typography fontWeight={400} variant="h6" sx={{ textDecoration: "line-through" }} color="gray">${book?.original_price}</Typography>}
              <Typography variant="h6" flex={1} fontWeight={500}>${book?.selling_price}</Typography>
              {book && book?.selling_price !== book?.original_price && <Typography color="green" variant="h6">{(((book.original_price - book.selling_price) / book.original_price) * 100).toFixed(1)}% off</Typography>}
            </Box> :
            <Skeleton height={32} width={250} />
            }
            <Box display="flex" gap={1}>
              {/* <Button variant="contained" color="success" startIcon={<BookmarkAddOutlined />}>Save For Later</Button> */}
              <Button disabled={!book} disableElevation onClick={addToCart} variant="contained" color="secondary" startIcon={<AddShoppingCart />}>Add To Cart</Button>
            </Box>
          </Box>
          <Divider />
          <Box padding={2}>
            <Typography>{book ? book.authors.replaceAll(';', ", ") : <Skeleton animation="wave" width={100} />}</Typography>
            <Typography variant="h4">{book ? book.title : <Skeleton animation="wave" width={200} />}</Typography>
            <Box mt={1} display="flex" gap={1} alignItems="center">
              {book ? <Rating precision={0.5} size="small" readOnly value={book.average_rating} /> : <Skeleton animation="wave" width={90} height={24} />}
              <Typography>{book ? `${book.average_rating.toFixed(1)} (${book?.ratings_count}) • ${book?.published_year}` : <Skeleton animation="wave" width={100} />}</Typography>
            </Box>
            <Box display="flex" gap={1} mt={2}>
              { book ? 
                book.categories.replaceAll(" & ", ', ').split(',').map((category, key) => <Chip key={key} size="small" label={category} />) :
                <Box display="flex" gap={1}>
                  <Skeleton animation="wave" width={50} height={24} />
                  <Skeleton animation="wave" width={50} height={24} />
                </Box>
              }
            </Box>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" padding={2} gap={1}>
            <Typography textTransform="uppercase" variant="h6">{book ? "Description" : <Skeleton width="11ch" />}</Typography>
            <Typography>{book ? book.description : <Skeleton width={250} />}</Typography>
          </Box>
        </Box>
      </Paper>
      {<Carousel
        onNextClick={nextBook}
        onBackClick={prevBook}
        title="Recommended Readings"
        steps={maxSteps}
        activeStep={step}
        header={
          <Box px={2} py={1} display="flex" alignItems="center">
            <Typography flex={1} textTransform="uppercase" variant="h6">Recommended Readings</Typography>
            <IconButton disabled={recommends?.length <= 0} size="small" onClick={recommendNext}>
              <Refresh />
            </IconButton>
          </Box>
        }
        disable={recommends?.length <= 0}
      >
        {recommends?.length > 0 ? 
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
          </Box> :
          <Box height="100%" display="flex" flexDirection="column" textAlign="center" justifyContent="center" alignItems="center" gap={2}>
            <Skeleton animation="wave" variant="rounded" height={160} width={110} />
            <Box display="flex" flexDirection="column" gap={1} alignItems="center">
              <Skeleton animation="wave" variant="rounded" height="1rem" width={200} />
              <Skeleton animation="wave" variant="rounded" height="1rem" width={160} />
            </Box>
            <Skeleton animation="wave" variant="rounded" height="1rem" width={180} />
          </Box>
        }
      </Carousel>}
    </Box>
  )
}