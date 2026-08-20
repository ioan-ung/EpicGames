import React from "react";
import { createPortal } from "react-dom";
import { Container, Row, Form, Col } from "react-bootstrap";
import "./style/popup.css";
import "./style/CreatePricePopup.css";
import { useState } from "react";
import { addPrice } from "../actions/productActions";
import { useDispatch } from "react-redux";

const CreatePricePopup = ({ open2, setOpen2 }) => {
  const [money, setMoney] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [coins, setCoins] = useState(0);
  const [priceId, setPriceId] = useState("default_value");

  const dispatch = useDispatch();

  if (!open2) {
    return null;
  }

  const handleClose = () => setOpen2(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPrice({ money, coins, bonus, priceId }));
  };

  return createPortal(
    <div className="createPriceOverlay" onClick={handleClose}>
      <Container
        fluid
        className="createPricePopup"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="createPricePopup__close"
          aria-label="Close"
          onClick={handleClose}
        >
          &times;
        </button>

        <h4 className="createPricePopup__title">Add New Price</h4>

        <Row className="justify-content-center w-100 m-0">
          <Col xs={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3 align-items-center">
                <Form.Label column sm="4" className="createPricePopup__label">
                  Money
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="number"
                    placeholder="Enter money"
                    className="createPricePopup__input"
                    onChange={(e) => setMoney(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 align-items-center">
                <Form.Label column sm="4" className="createPricePopup__label">
                  Coins
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="number"
                    placeholder="Enter coins"
                    className="createPricePopup__input"
                    onChange={(e) => setCoins(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 align-items-center">
                <Form.Label column sm="4" className="createPricePopup__label">
                  Bonus
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="number"
                    placeholder="Enter bonus"
                    className="createPricePopup__input"
                    onChange={(e) => setBonus(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4 align-items-center">
                <Form.Label column sm="4" className="createPricePopup__label">
                  Price ID
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    placeholder="Enter price ID"
                    className="createPricePopup__input"
                    onChange={(e) => setPriceId(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <div className="createPricePopup__actions">
                <button type="submit" className="createPricePopup__btn createPricePopup__btn--primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="createPricePopup__btn createPricePopup__btn--danger"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>,
    document.body
  );
};

export default CreatePricePopup;
