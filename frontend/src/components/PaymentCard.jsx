import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Garbage from "../svg/garbage.svg?react";
import { deletePrice } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import "./style/PaymentCard.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const PaymentCard = ({ data, setMoney, setCoins, setBonus, setPriceId }) => {
  const dispatch = useDispatch();
  const { finalCoins, setFinalCoins } = useContext(AuthContext);
  const { user, logout } = useContext(AuthContext);
  const userCredentials = useSelector((state) => state.getUserReducer);
  const {loading,error,userDetails} = userCredentials

  useEffect(() => {
    localStorage.setItem("finalCoins", finalCoins);
  }, [finalCoins]);

  return (
    <div
      style={{ display: "flex", width: "22rem" }}
      onClick={() => {
        setMoney(data.money);
        setCoins(data.coins);
        setBonus(data.bonus);
        setPriceId(data.priceId);
        setFinalCoins(data.coins);
      }}
    >
      <Col
        className="PaymentCardHover d-flex align-items-center justify-content-center"
        style={{ margin: "2em" }}
      >
        {
          <>
            {console.log("aicea", userDetails)}
            <Button className="button">
              <Row
                md={2}
                xl={4}
                sm={6}
                className="d-flex align-items-center justify-content-center"
              >
                <p style={{ margin: "0", width: "100%" }}>
                  {data.coins} coins
                  <br />
                  <small style={{ margin: "0", color: "yellowgreen" }}>
                    +{data.bonus} bonus coins
                  </small>
                </p>
              </Row>

              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  backgroundColor: "transparent",
                  color: "white",
                  padding: "5px 10px",
                }}
              >
                <span style={{ color: "green" }}>$</span>
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
        }
      </Col>
    </div>
  );
};

export default PaymentCard;
