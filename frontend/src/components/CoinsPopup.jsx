import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Container, Row } from "react-bootstrap";
import PaymentCard from "./PaymentCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deletePriceWithoutId, getPrices } from "../actions/productActions";
import Loader from "./Loader";
import CreatePricePopup from "./CreatePricePopup";
import { useState } from "react";
import { useContext } from "react";
import Error from "./Error";
import StripePayment from "../pages/StripePayment";
import { AuthContext } from "../context/AuthContext";

export default function CoinsPopup({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const input = useSelector((state) => state.getPricesReducer);
  const addPrice = useSelector((state) => state.addPriceReducer);
  const [refresh, setRefresh] = useState(false);
  let number = 1;
  const { data, loading, error } = input;
  const { data: newPrice, loading: loadingPrice, error: errorPrice } = addPrice;
  const dispatch = useDispatch();
  const [open2, setOpen2] = React.useState(false);
  const { user, logout } = useContext(AuthContext);
  const [money, setMoney] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [coins, setCoins] = useState(0);
  const [priceId, setPriceId] = useState("default_value");
  const userCredentials = useSelector((state) => state.getUserReducer);
  const {userDetails} = userCredentials

  useEffect(() => {
    dispatch(getPrices());
  }, [dispatch]);

  useEffect(() => {
    if (newPrice) setRefresh((prev) => !prev);
  }, [newPrice]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Container fluid className="popup">
          {error && (
            <Row className="d-flex justify-content-center text-center my-3">
              <div style={{ color: "#fff", fontWeight: 600 }}>
                Coins packs are temporarily unavailable.
              </div>
            </Row>
          )}

          {userDetails?.is_superuser && (
            <Row className="d-flex justify-content-center">
              <button
                type="submit"
                class="btn btn-outline-primary btn-lg btn-block"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen2(true);
                }}
                style={{
                  border: "1px solid blue",
                  width: "auto",
                  textTransform: "none",
                }}
              >
                Add Price
              </button>
              <CreatePricePopup setOpen2={setOpen2} open2={open2} />

              <Button
                class="btn btn-danger"
                style={{
                  color: "red",
                  backgroundColor: "transparent",
                  width: "auto",
                }}
                onClick={() => dispatch(deletePriceWithoutId())}
              >
                Delete Prices
              </Button>
            </Row>
          )}

          {data &&
            data.map((money) => {
              if (money && money.length === 3) {
                return (
                  <Row key={number}>
                    <PaymentCard
                      data={money[0]}
                      setMoney={setMoney}
                      setCoins={setCoins}
                      setBonus={setBonus}
                      setPriceId={setPriceId}
                    />
                    {number++}
                    <PaymentCard
                      data={money[1]}
                      setMoney={setMoney}
                      setCoins={setCoins}
                      setBonus={setBonus}
                      setPriceId={setPriceId}
                    />
                    {number++}
                    <PaymentCard
                      data={money[2]}
                      setMoney={setMoney}
                      setCoins={setCoins}
                      setBonus={setBonus}
                      setPriceId={setPriceId}
                    />
                    {number++}
                  </Row>
                );
              } else if (money && money.length === 2) {
                return (
                  <Row key={number}>
                    <PaymentCard
                      data={money[0]}
                      setMoney={setMoney}
                      setCoins={setCoins}
                      setBonus={setBonus}
                      setPriceId={setPriceId}
                    />
                    {number++}
                    <PaymentCard
                      data={money[1]}
                      setMoney={setMoney}
                      setCoins={setCoins}
                      setBonus={setBonus}
                      setPriceId={setPriceId}
                    />
                    {number++}
                  </Row>
                );
              } else if (money && money.length === 1) {
                return (
                  <Row key={number}>
                    <PaymentCard
                      data={money[0]}
                      setMoney={setMoney}
                      setCoins={setCoins}
                      setBonus={setBonus}
                      setPriceId={setPriceId}
                    />
                    {number++}
                  </Row>
                );
              }

              return null;
            })}
          {data && data.length && (
            <StripePayment
              money={money}
              coins={coins}
              bonus={bonus}
              priceId={priceId}
            />
          )}
        </Container>
      </Modal>
    </div>
  );
}
