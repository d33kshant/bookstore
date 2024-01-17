"use client"
import { useContext } from "react"
import { Box, Divider, IconButton, Paper, Rating, Typography } from "@mui/material"
import { StoreContext } from "@/app/contexts/StoreContext"
import { Bookmark, BookmarkOutlined, BookmarksOutlined, CalendarMonth, Close, Person } from "@mui/icons-material"
import { StoreActionType } from "../reducers/StoreReducer"
import { ToastContext } from "../contexts/ToastContext"

export default function ReadingPage() {
  const { state: { readings }, dispatch } = useContext(StoreContext)
  const { toast } = useContext(ToastContext)

  const removeBook = (id: string) => {
    dispatch({ type: StoreActionType.READ_REM, payload: { id } })
    toast("Removed from Readings", "success")
  }

  return (
    <Paper>
      <Box display="flex" flexDirection="column">
        <Box>
          {readings.length <= 0 ?
            <Box height={300} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
              <BookmarksOutlined color="action" fontSize="large"/>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography color="gray">Your reading list is empty</Typography>
                <Typography color="royalblue" component="a" href="/search">Explore Books</Typography>
              </Box>
            </Box> :
            <Box>
              <Box px={2} py={1}>
                <Typography textTransform="uppercase" variant="h6">Readings ({readings.length})</Typography>
              </Box>
              <Divider />
              {readings.map((book, index) => (
                <>
                  <Box width="100%" key={book.id} display="flex" p={2} gap={2}>
                    <Paper>
                      <img className="w-24 h-full object-cover rounded" src={book.thumbnail} />
                    </Paper>
                    <Box width="100%" display="flex" flexDirection="column">
                      <Box width="100%" display="flex" alignItems="start">
                        <Box width="100%" component="a" href={`/book/${book.id}`}>
                          <Typography
                            fontWeight={500}
                            flex={1}
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical'
                            }}>
                            {book.title}
                          </Typography>
                          <Typography>{book.categories.replaceAll(" & ", ', ')} </Typography>
                          <Typography display="flex" alignItems="center" color="gray" gap={1}>
                            <Person fontSize="small" />
                            {book.authors.replaceAll(';', ", ")}
                          </Typography>
                          <Typography display="flex" alignItems="center" color="gray" gap={1}>
                            <CalendarMonth fontSize="small" />
                            {book.published_year}
                          </Typography>
                        </Box>
                        <IconButton sx={{ height: 40, width: 40 }} onClick={() => removeBook(book.id)} color="error">
                          <Close />
                        </IconButton>
                      </Box>
                      <Box mt="auto" display="flex" gap={1} alignItems="center">
                        <Rating readOnly size="small" value={book.average_rating} precision={0.5} />
                        <Typography>{book.average_rating.toFixed(1)} ({ book.ratings_count})</Typography>
                      </Box>
                    </Box>
                  </Box>
                  {index !== readings.length - 1 && <Divider />}
                </>
              ))}
            </Box>
          }
        </Box>
      </Box>
    </Paper>
  )
}