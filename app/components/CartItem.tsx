import { Add, Remove } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Divider, Paper, Typography } from "@mui/material";
import { Book } from "@prisma/client";

export default function CartItem({
  id,
  title,
  thumbnail,
  categories,
  selling_price,
  original_price,
  lastItem,
}: Book & { lastItem: boolean }) {
  return (
    <>
      <Box display="flex" gap={2} p={2}>
        <a href={`/book/${id}`}>
          <img className="w-24 object-cover rounded shadow-md" src={thumbnail} />
        </a>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box component="a" href={`/book/${id}`}>
            <Typography fontWeight={500} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{title}</Typography>
            <Typography color="gray">{categories}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            { selling_price !== original_price && <Typography sx={{ textDecoration: "line-through" }} color="gray">${original_price}</Typography> }
            <Typography flex={1} fontWeight={500}>${selling_price}</Typography>
          </Box>
          <ButtonGroup sx={{ mt: "auto" }} size="small">
            <Button>
              <Add fontSize="small" />
            </Button>
            <Button disableTouchRipple disableRipple disableFocusRipple disableElevation>1</Button>
            <Button>
              <Remove fontSize="small" />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      {!lastItem && <Divider />}
    </>
  )
}