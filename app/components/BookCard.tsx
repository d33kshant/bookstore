import { Star } from "@mui/icons-material"
import { Box, Card, Grid, Typography } from "@mui/material"
import { Book } from "@prisma/client"

export default function BookCard({
  id,
  title,
  thumbnail,
  categories,
  average_rating,
  ratings_count,
  selling_price,
  original_price,
}: Book) {
  return (
    <Grid item  xs={6} sm={6} md={4}>
      <Card title={title} href={`/book/${id}`} component="a" sx={{ display: "flex", background: "white", textDecoration: "none" }}>
        <Box width="100%" height="100%" p={1}>
          <img src={thumbnail} style={{ objectFit: "cover", width: "100%", height: 300, borderRadius: 4, marginBottom: 8, border: "1px solid lightgray", overflow: "hidden" }} />
          <Box>
            <Typography fontWeight={500} variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{title}</Typography>
            <Typography variant="body2" color="gray"  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{categories}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} gap={1}>
            { selling_price !== original_price && <Typography sx={{ textDecoration: "line-through" }} color="gray">${original_price}</Typography> }
            <Typography flex={1} fontWeight={500}>${selling_price}</Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Star fontSize="small" color="action" sx={{ mb: 0.3 }}/>
              <Typography color="gray">{average_rating.toFixed(1)} ({ratings_count > 999 ? "999+" : ratings_count})</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}