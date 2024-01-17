import { Add, Clear, Remove } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Divider, Paper, Typography } from "@mui/material";
import { Book } from "@prisma/client";
import { useContext } from "react";
import { StoreContext } from "@/app/contexts/StoreContext";
import { StoreActionType } from "@/app/reducers/StoreReducer";

export default function CartItem({
  id,
  title,
  thumbnail,
  categories,
  selling_price,
  original_price,
  lastItem,
  count,
}: Book & { count: number, lastItem: boolean }) {
  const { dispatch } = useContext(StoreContext)
  return (
    <>
      <Box display="flex" gap={2} p={2}>
        <Paper>
          <a href={`/book/${id}`}>
            <img className="w-24 h-full object-cover rounded" src={thumbnail} />
          </a>
        </Paper>
        <Box width="100%" display="flex" flexDirection="column" gap={1}>
          <Box component="a" href={`/book/${id}`}>
            <Typography fontWeight={500} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{title}</Typography>
            <Typography color="gray">{categories}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {selling_price !== original_price && <Typography sx={{ textDecoration: "line-through" }} color="gray">${original_price}</Typography>}
            <Typography flex={1} fontWeight={500}>${selling_price}</Typography>
          </Box>
          <Box display="flex">
            <ButtonGroup sx={{ flex: 1, mt: "auto" }} size="small">
              <Button onClick={() => { dispatch({ type: StoreActionType.CART_ADD, payload: { id } }) }}>
                <Add fontSize="small" />
              </Button>
              <Button disableTouchRipple disableRipple disableFocusRipple disableElevation>{count}</Button>
              <Button onClick={() => { dispatch({ type: StoreActionType.CART_REM, payload: { id } }) }} >
                <Remove fontSize="small" />
              </Button>
            </ButtonGroup>
            <Button onClick={() => { dispatch({ type: StoreActionType.CART_DEL, payload: { id } }) }} color="error" size="small" variant="outlined">
              <Clear fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
      {!lastItem && <Divider />}
    </>
  )
}