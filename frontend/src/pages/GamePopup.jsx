import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Pricing from "../svg/price.svg?react";
import { Image } from "react-bootstrap";
import VideoCarousel from "../components/VideoCarousel";
import { addToWishList } from "../actions/productActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loader from "../components/Loader";
import { getProductById } from "../actions/productActions";
import BuyGame from "../components/BuyGame";
import Money from "../svg/money.svg?react";
import Company from "../svg/company.svg?react";
import Download from "../svg/downloads.svg?react";
import Memory from "../svg/memory.svg?react";
import Baby from "../svg/baby.svg?react";

const GamePopup = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [buyNow, setBuyNow] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch,id]);

  const getGameById = useSelector((state) => state.getProductByIdReducer);
  const { loading, error, game } = getGameById;
  const userCredentials = useSelector((state) => state.getUserReducer);
  const {userDetails} = userCredentials

  return (
    <div className="MainPage" style={{ overflowY: "scroll" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert />
      ) : (
        <Container
          fluid
          className="d-flex flex-column align-items-center"
          style={{
            top: "5rem",
            position: "relative",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Row style={{ width: "100vw" }}>
            <Col style={{ position: "relative" }} md={10}>
              <Row
                className="d-flex align-items-center justify-content-center"
                style={{ position: "relative", width: "100%" }}
              >
                <Image
                  style={{ width: "80%", borderRadius: "10%" }}
                  src={game?.image}
                  alt="image not found"
                />
              </Row>
              <Row
                className="d-flex align-items center justify-content-center mt-5"
                style={{ position: "relative", overflowX: "visible" }}
              ></Row>
              {game && <VideoCarousel video={game.introductionVideo} />}

              <Container className="mt-5" style={{ position: "relative" }}>
                <Row style={{ color: "white" }}>{game?.description}</Row>
                <Row style={{ color: "white" }}>
                  <Col
                    style={{ borderLeft: "1px solid rgb(245, 245, 245,0.5)" }}
                  >
                    <small style={{ opacity: 0.6 }}>Genred</small>
                    {game?.gameTags.map((tag) => (
                      <Row key={tag?.id}>
                        <Link style={{ color: "white" }}>{tag?.name}</Link>
                      </Row>
                    ))}
                  </Col>
                  <Col
                    style={{ borderLeft: "1px solid rgb(245, 245, 245,0.5)" }}
                  >
                    <Row>
                      <small style={{ opacity: "0.6" }}>Features</small>
                    </Row>
                    <Row>
                      <small>
                        {game?.multiplayer === true
                          ? "Multiplayer"
                          : "SinglePlayer"}
                      </small>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col>
              <Col>
                <Button
                  className="mt-2"
                  style={{
                    height: "3rem",
                    width: "10rem",
                    border: "none",
                    background: "red",
                    color: "black",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setBuyNow(true);
                  }}
                >
                  <strong>BUY NOW</strong>
                </Button>
              </Col>
              <Col className="mt-2"></Col>
              <Col className="mt-2">
                <Button
                  className="mt-2 btn-black-btn d-flex align-items-center justify-content-center"
                  style={{
                    position: "relative",
                    height: "2.9rem",
                    width: "10rem",
                    background: "transparent",
                    color: "rgb(245, 245, 245,0.5)",
                    border: "1px solid rgb(245, 245, 245,0.5)",
                  }}
                  onClick={() => {
                    dispatch(addToWishList(id,userDetails.id));
                  }}
                >
                  <div
                    style={{
                      margin: "0",
                      width: "1.5rem",
                      position: "absolute",
                      left: "0.2rem",
                    }}
                    className="PricingSvg"
                  >
                    <Pricing
                      style={{ width: "1.5rem", marginLeft: "0.3rem" }}
                    />
                  </div>
                  <p style={{ margin: "0", marginLeft: "1.5rem" }}>
                    Add to wishlist
                    <BuyGame
                      price={game?.price}
                      id={game?.id}
                      buyNow={buyNow}
                      setBuyNow={setBuyNow}
                    />
                  </p>
                </Button>

                <div style={{ color: "white", marginTop: "0.5rem" }}>
                <Money style={{height:"1.5rem"}}/><strong> Price: </strong>
                  {game?.price} 
                </div>

                <div style={{ color: "white", marginTop: "0.5rem"}}>
                  <Company style={{height:"1.5rem",width:"auto"}}/><strong> Company: </strong>
                  {game?.company} 
                </div>

                <div style={{ color: "white", marginTop: "0.5rem"}}>
                  <Download style={{height:"1.5rem",width:"auto"}}/><strong> Downloads: </strong>
                  {game?.downloads} M
                </div>

                <div style={{ color: "white", marginTop: "0.5rem"}}>
                  <Memory style={{height:"1.5rem",width:"auto"}}/><strong> Memory: </strong>
                  {game?.memory} GB
                </div>

                <div style={{ color: "white", marginTop: "0.5rem"}}>
                  <Baby style={{height:"1.5rem",width:"auto"}}/><strong> Age: </strong>
                  {game?.age} 
                </div>

              </Col>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default GamePopup;
