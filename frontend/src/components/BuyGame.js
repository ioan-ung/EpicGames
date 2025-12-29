import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as Money } from "../svg/money.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function BuyGame({ price, id, buyNow, setBuyNow }) {
  const userCredentials = useSelector((state) => state.getUserReducer);
  const { loading, error, userDetails } = userCredentials;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = () => {
    if (userDetails.coins < price) {
      setBuyNow(false);
      alert("Insufficient funds.Please add some coins");
    } else {
      const coinsToSend = (userDetails?.coins - price).toFixed(2);
      const { bought_games, ...rest } = userDetails;
      const newBoughtGames = [...bought_games, id];
      const boughtGamesString = newBoughtGames.join(",");

      const data = {
        coins: parseFloat(coinsToSend),
        bought_games: boughtGamesString,
      };

      dispatch(
        updateUserAction({
          user: userDetails?.id,
          data: data,
          navigate: navigate,
        })
      );
    }
  };

  return (
    <Dialog
      open={buyNow}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Continue transaction?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to continue with this transaction? You'll pay{" "}
          <strong>
            {price} <Money />
          </strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setBuyNow(false)}>
          No
        </Button>
        <Button color="primary" autoFocus onClick={() => handlePayment()}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BuyGame;
