import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import Money from "../svg/money.svg?react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./style/BuyGame.css";

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

      const data = {
        coins: parseFloat(coinsToSend),
        bought_games: newBoughtGames,
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
      onClose={() => setBuyNow(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "buy-game-paper" }}
    >
      <DialogTitle id="alert-dialog-title" className="buy-game-title">
        Continue transaction?
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          className="buy-game-text"
        >
          Are you sure you want to continue with this transaction? You'll pay{" "}
          <span className="buy-game-price">
            {price} <Money />
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buy-game-actions">
        <Button
          className="buy-game-btn buy-game-btn-cancel"
          onClick={() => setBuyNow(false)}
        >
          No
        </Button>
        <Button
          className="buy-game-btn buy-game-btn-confirm"
          autoFocus
          onClick={() => handlePayment()}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BuyGame;
