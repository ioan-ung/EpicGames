import React from "react";
import {Container, Row, Form, Col } from "react-bootstrap";
import "./style/popup.css";
import { useState } from "react";
import { addPrice } from "../actions/productActions";
import { useDispatch } from "react-redux";

const CreatePricePopup = ({ open2, setOpen2 }) => {
  const [money, setMoney] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [coins, setCoins] = useState(0);
  const [priceId,setPriceId] = useState("default_value");

  const dispatch = useDispatch();

  if (!open2) {
    return null;
  }

  return (
    <div
      style={{
        width: "80vw",
        height: "80vh",
        backgroundColor: "rgb(55,55,55)",
        position: "absolute",
        zIndex: "8",
        top: "10%",
        padding: "20px",
        overflowY: "hidden",
      }}
    >
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            
            <Form>
              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" className="label">
                  <strong>MONEY:</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Enter MONEY"
                    className="input"
                    onChange={(e) => setMoney(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" className="label">
                  <strong>COINS:</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Enter COINS"
                    className="input"
                    onChange={(e) => setCoins(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" className="label">
                  <strong>BONUS:</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Enter BONUS"
                    className="input"
                    onChange={(e) => setBonus(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" className="label">
                  <strong>PriceId:</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="char"
                    placeholder="Enter PRICE-ID"
                    className="input"
                    onChange={(e) => setPriceId(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Form.Group>

              <Container style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              }}>
              <button type="submit"  class="btn btn-outline-primary btn-lg btn-block"
                onClick={() => dispatch(addPrice({ money, coins, bonus,priceId }))}
                className="w-100"
                style={{
                  backgroundColor:"transparent",
                  borderColor:"#007bff",
                  color:"#007bff"
                }}
              >
                Submit
              </button>
              <button
              type="danger"
              className="btn btn-danger w-100"
              onClick={() => setOpen2(false)}
              style={{
                backgroundColor:"transparent",
                borderColor:"#ff0080",
                color:"#ff0080"
              }}
            >
              Close Popup
            </button>
            </Container>

            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePricePopup;
