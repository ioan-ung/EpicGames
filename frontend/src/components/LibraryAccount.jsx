import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Product from "./Product";
import Loader from "./Loader";
import Error from "./Error";
import { useDispatch } from "react-redux";
import { getSearchedProduct } from "../actions/productActions";

const LibraryAccount = () => {
  const userCredentials = useSelector((state) => state.getUserReducer);
  const { loading, error, userDetails } = userCredentials;
  const game_ids = userDetails.bought_games;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchedProduct("", 1));
  }, [dispatch]);

  const getProducts = useSelector((state) => state.getSearchedProductsReducer);
  const { games: products, products: directProducts } = getProducts;
  const newProduct = directProducts ?? products?.products ?? products ?? [];

  return loading ? (
    <Loader />
  ) : error ? (
    <Error />
  ) : (
    <Container
      style={{
        backgroundImage: "linear-gradient(#13120F, #252525)",
        width: "100vw",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <Row
        style={{
          width: "100%",
          height: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          color: "gray",
          opacity: "0.6",
          fontWeight: "bold",
          fontSize: "5rem",
          margin: "0",
        }}
      >
        My games
      </Row>
      <Container style={{ paddingTop: "30vh" }}>
        <Row>
          <Col xs={6} style={{ paddingLeft: 0 }}>
            {Array.isArray(newProduct) &&
              newProduct
                .filter((product) => game_ids.includes(product.id))
                .slice(0, newProduct.length / 2)
                .map((game) => <Product key={game.id} product={game} />)}
          </Col>
          <Col xs={6} style={{ paddingLeft: 0 }}>
            {Array.isArray(newProduct) &&
              newProduct
                .filter((product) => game_ids.includes(product.id))
                .slice(newProduct.length / 2)
                .map((game) => <Product key={game.id} product={game} />)}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default LibraryAccount;
