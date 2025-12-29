import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ReactComponent as Cart } from "../svg/cart.svg";
import { ReactComponent as Garbage } from "../svg/garbage.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFromWishList } from "../actions/productActions";

function WishRow({ game, setWishList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFromWishList(game?.id));
  };

  return (
    <Container
      style={{
        width: "100vw",
        maxHeight: "12rem",
        display: "flex",
        position: "relative",
        backgroundImage: "linear-gradient(#262524, #3C3C3C)",
        marginBottom: "0.5rem",
      }}
    >
      {console.log("joc hg", game)}
      <Row style={{ width: "100%" }}>
        <Col xs={4}>
          <div
            style={{
              position: "relative",
              width: "auto",
              height: "10rem",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{
                maxHeight: "90%",
                cursor: "pointer",
                borderRadius: "10%",
              }}
              src={game?.image}
              alt="Couldn't open"
            />
            <strong
              style={{
                position: "absolute",
                maxHeight: "0.3rem",
                bottom: "15%",
                left: "1rem",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            >
              {game?.name}
            </strong>
          </div>
        </Col>
        <Col xs={4} style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                color: "gray",
                opacity: "0.8",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            >
              <i>Crush Games WishList</i>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              color: "gray",
              opacity: "0.8",
              cursor: "pointer",
            }}
          >
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={() => handleDelete()}
            >
              Delete <Garbage />
            </button>
          </div>
        </Col>
        <Col
          xs={4}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={() => {
              navigate(`/gamePage/${game?.id}`);
              setWishList(false);
            }}
          >
            {game?.price}
          </button>
          <Button className="btn-primary">
            <Cart
              style={{
                right: "1rem",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/gamePage/${game?.id}`);
                setWishList(false);
              }}
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default WishRow;
