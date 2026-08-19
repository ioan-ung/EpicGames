import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Garbage from "../svg/garbage.svg?react";
import { deletePrice } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import "./style/PaymentCard.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const PaymentCard = ({
  data,
  setMoney,
  setCoins,
  setBonus,
  setPriceId,
  selectedPriceId,
}) => {
  const dispatch = useDispatch();
  const { finalCoins, setFinalCoins } = useContext(AuthContext);
  const { user, logout } = useContext(AuthContext);
  const userCredentials = useSelector((state) => state.currentUser);
  const {loading,error,userDetails} = userCredentials
  const isSelected = selectedPriceId === data.priceId;

  useEffect(() => {
    localStorage.setItem("finalCoins", finalCoins);
  }, [finalCoins]);

  return (
    <div
      className="payment-card-wrap"
      onClick={() => {
        setMoney(data.money);
        setCoins(data.coins);
        setBonus(data.bonus);
        setPriceId(data.priceId);
        setFinalCoins(data.coins);
      }}
    >
      <Col className="PaymentCardHover payment-card-col d-flex align-items-center justify-content-center">
        <>
          <Button className={`button${isSelected ? " button-selected" : ""}`}>
            <Row
              md={2}
              xl={4}
              sm={6}
              className="d-flex align-items-center justify-content-center"
            >
              <p className="payment-card-content">
                {data.coins} coins
                <br />
                <small style={{ margin: "0", color: "yellowgreen" }}>
                  +{data.bonus} bonus coins
                </small>
              </p>
            </Row>

            <div className="payment-card-price">
              <span style={{ color: "#d8ffd8" }}>$</span>
              {data.money}
            </div>
          </Button>
          {userDetails?.is_superuser && (
            <span
              style={{
                position: "absolute",
                bottom: "0.2rem",
                right: "0",
              }}
            >
              <button
                style={{
                  backgroundColor: "transparent",
                  height: "auto",
                  color: "red",
                  border: "none",
                }}
                onClick={() => dispatch(deletePrice(data.id))}
              >
                <Garbage />
              </button>
            </span>
          )}
        </>
      </Col>
    </div>
  );
};

export default PaymentCard;
