import { Box, Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./basketSummary";
import { Link } from "react-router-dom";
import BasketTable from "./basketTable";
import { useAppSelector } from "../../app/store/store.config";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <BasketTable items={basket.items} />

      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
