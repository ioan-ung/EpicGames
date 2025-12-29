import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { Alert, Col, Container } from "react-bootstrap";
import {
  getTopRatedProductsAction,
  getMostDownloadedProductsAction,
  getYoungestProductsAction,
  getOldestProductsAction,
} from "../actions/productActions";
import "./style/popup.css";
import Error from "./Error";
import "./style/Store2.css";
import { TypeAnimation } from "react-type-animation";
import DropDown from "./DropDown";
import { ReactComponent as Download } from "../svg/downloads.svg";
import { ReactComponent as Star } from "../svg/star.svg";
import { ReactComponent as Up } from "../svg/Up.svg";
import { ReactComponent as Down } from "../svg/Down.svg";
import { ReactComponent as Baby } from "../svg/baby.svg";

const Store2 = () => {
  const [text, setText] = useState("TopRated");
  const [direction, setDirection] = useState("UP");

  const getProducts = useSelector((state) => {
    let data;
    console.log("direction",direction)
    if (direction === "UP")
       data = state.getYoungestProductsReducer;
    else if (direction === "DOWN") 
      data = state.getOldestProductsReducer;
    else if (text === "TopRated") {
      data = state.getTopRatedProductsReducer;
    } else if (text === "MostDownloaded") {
      data = state.getMostDownloadedProductsReducer;
    }

    return data;
  });

  const { loading, error, games } = getProducts;
  const dispatch = useDispatch();
  const [typingText, setTypingText] = useState(true);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (direction === "UP") dispatch(getYoungestProductsAction());
    else if (direction === "DOWN") dispatch(getOldestProductsAction());
    else if (text === "TopRated") dispatch(getTopRatedProductsAction());
    else if (text === "MostDownloaded")
      dispatch(getMostDownloadedProductsAction());
  }, [dispatch, text, direction]);

  const [specificGame, setSpecificGame] = useState(
    games && games.length > 0 ? games[0] : null
  );

  useEffect(() => {
    if (games && games.length > 0) {
      setSpecificGame(games[0]);
      setTypingText(true);
    }
  }, [games]);

  useEffect(() => {
    if (specificGame && !typingText) {
      setTypingText(true);
    }
  }, [specificGame, typingText]);

  return (
    <div>
      {loading || !specificGame ? (
        <Loader />
      ) : error ? (
        <Alert variant={"danger"}>
          <Error />
        </Alert>
      ) : (
        <Container
          fluid
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "5%",
            position: "relative",
            height: "100vh",
            width: "100vw",
            justifyContent: "space-around",
            overflowY: "hidden",
            overflowX: "hidden",
          }}
        >
          <Col
            style={{
              flex: 2,
              height: "100vh",
              maxWidth: "80vw",
              overflowY: "hidden",
              overflowX: "visible",
              padding: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                left: "15vw",
                top: "5vh",
                height: "100%",
                width: "80%",
                overflowX: "visible",
              }}
            >
              <img
                src={specificGame.image}
                alt="cannot open"
                style={{
                  maxHeight: "80%",
                  marginTop: "1rem",
                  left: "10vw",
                  cursor: "pointer",
                  borderRadius: "10%",
                  aspectRatio: "unset",
                }}
                onLoad={(e) => {
                  const imageWidth = e.target.clientWidth;
                  const imageHeight = e.target.clientHeight;

                  const text = document.querySelector(".responsive-text-2");
                  if (text) {
                    text.style.maxWidth = imageWidth * 0.8 + "px";
                    text.style.maxHeight = imageHeight * 0.8 + "px";
                  }
                }}
              />
              <h4
                className="responsive-text"
                style={{
                  color: "#8fa38a",
                  position: "absolute",
                  top: "10%",
                  left: "10vw",
                }}
              >
                {specificGame.name}
              </h4>

              <p
                className="responsive-text-2"
                style={{
                  color: "#c5efcb",
                  zIndex: "7",
                  position: "absolute",
                  top: "20%",
                  left: "10vw",
                  width: "80%",
                  overflow: "auto",
                  fontSize: "1rem",
                }}
              >
                {typingText && specificGame && (
                  <TypeAnimation
                  sequence={[specificGame.description, 2000]}
                  speed={50}
                  />
                )}
              </p>
            </div>
          </Col>

          {games && (
            <Col
              style={{
                wrap: "wrap",
                position: "relative",
                left: "10vw", //!din 15 s
                overflowY: "auto",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "space-between",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => {
                  menu ? setMenu(false) : setMenu(true);
                }}
              >
                <h3
                  style={{
                    color: "#758173",
                    marginTop: "2rem",
                    marginRight: "30%",
                  }}
                >
                  <strong
                    style={{ marginLeft: "-10%" }}
                    className="responsive-text"
                  >
                    {text}
                    {text === "Age" && (direction === "UP" ? <Up/> : <Down/>)}
                  </strong>
                </h3>
              </span>
              <DropDown
                menu={menu}
                setMenu={setMenu}
                text={text}
                setText={setText}
                direction={direction}
                setDirection={setDirection}
              />
              (
              {games &&
                games.length > 0 &&
                games.map((game, index) =>
                  specificGame &&
                  specificGame.id &&
                  game.id &&
                  specificGame.id === game.id ? null : (
                    <>
                      <img
                        key={index++}
                        src={game.image}
                        alt={`Mini ${game.name}`}
                        style={{
                          width: "10rem",
                          height: "auto",
                          marginTop: "1rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSpecificGame(game);
                          setTypingText(false);
                        }}
                      />
                      <span
                        onClick={() => {
                          setSpecificGame(game);
                          setTypingText(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <p
                          style={{
                            color: "#d0e1d4",
                            cursor: "pointer",
                          }}
                        >
                          {game.name}
                        </p>
                        {text === "Age" ? <span  style={{ color: "white" }} >{game.age} <Baby/></span> 
                        :text === "TopRated" ? (
                          <>
                            <p style={{ marginLeft: "0.5rem", color: "white" }}>
                              {game.rating}
                            </p>
                            <Star style={{ color: "yellow" }} />
                          </>
                        ) : (
                          <>
                            <p style={{ marginLeft: "0.5rem", color: "white" }}>
                              {game.downloads}
                            </p>
                            <Download style={{ color: "white" }} />
                          </>
                        )}
                      </span>
                    </>
                  )
                )}
            </Col>
          )}
        </Container>
      )}
    </div>
  );
};

export default Store2;
