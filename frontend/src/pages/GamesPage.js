import React, { useEffect } from "react";
import CarouselComponent from "../components/Carousel";
import { Alert, Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchedProduct,
  getTopRatedProductsAction,
} from "../actions/productActions";
import Loader from "../components/Loader";

const GamesPage = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getSearchedProductsReducer);
  const getTopRated = useSelector((state) => state.getTopRatedProductsReducer);
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword");
  const page = urlParams.get("page");

  const { error, loading, games: products } = getProducts;
  const {
    error: errorTopRated,
    loading: loadingTopRated,
    games: topRatedProducts,
  } = getTopRated;

  useEffect(() => {
    if (keyword == null || keyword === undefined || page === null)
      dispatch(getSearchedProduct("", 1));
    else dispatch(getSearchedProduct(keyword, page));

    dispatch(getTopRatedProductsAction());
  }, [dispatch, keyword, page]);

  return (
    <div className="MainPage" style={{ overflowY: "scroll" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant={"danger"}>
          Alert("Unexpected error! Come back later! ")
        </Alert>
      ) : errorTopRated ? (
        <Alert variant={"danger"}>Alert("Data error")</Alert>
      ) : (
        <>
          <CarouselComponent topRatedProducts={topRatedProducts} />
          <div>
            <Row>
              {products?.products.map((product) => (
                <Col key={product?.id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default GamesPage;
