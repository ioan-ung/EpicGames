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
  const keyword = urlParams.get("keyword") ?? "";
  const page = urlParams.get("page") ?? "1";

  const { error, loading, products, pages } = getProducts;
  const { error: errorTopRated, games: topRatedProducts } = getTopRated;

  useEffect(() => {
    dispatch(getSearchedProduct(keyword, page));
    dispatch(getTopRatedProductsAction());
  }, [dispatch, keyword, page]);

  return (
    <div className="MainPage" style={{ overflowY: "scroll", paddingTop: "5rem" }}>
      {loading ? (
        <Loader />
      ) : error || errorTopRated ? (
        Alert("Unexpected error! Come back later! ")
      ) : (
        <>
          <CarouselComponent topRatedProducts={topRatedProducts} />
          <Row>
            {products?.products.map((product) => (
              <Col key={product?.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default GamesPage;
