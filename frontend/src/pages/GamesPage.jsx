import React, { useEffect, useState } from "react";
import CarouselComponent from "../components/Carousel";
import { Alert, Col, Row, Button } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchedProduct,
  getTopRatedProductsAction,
  getMostDownloadedProductsAction,
  getYoungestProductsAction,
  getOldestProductsAction,
} from "../actions/productActions";
import Loader from "../components/Loader";

const GamesPage = () => {
  const dispatch = useDispatch();
  const [carouselFilter, setCarouselFilter] = useState("TopRated");

  const getProducts = useSelector((state) => state.searchResults);
  const getTopRated = useSelector((state) => state.topRatedGames);
  const getMostDownloaded = useSelector((state) => state.mostDownloadedGames);
  const getYoungest = useSelector((state) => state.newestGames);
  const getOldest = useSelector((state) => state.oldestGames);

  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword") ?? "";
  const page = urlParams.get("page") ?? "1";

  const { error, loading, products, games } = getProducts;
  const { error: errorTopRated, games: topRatedProducts = [] } = getTopRated;
  const { error: errorMostDownloaded, games: mostDownloadedProducts = [] } = getMostDownloaded;
  const { error: errorYoungest, games: youngestProducts = [] } = getYoungest;
  const { error: errorOldest, games: oldestProducts = [] } = getOldest;

  const browseGames = products?.products ?? products ?? games?.products ?? games ?? [];

  const carouselMap = {
    TopRated: topRatedProducts,
    MostDownloaded: mostDownloadedProducts,
    Newest: youngestProducts,
    Oldest: oldestProducts,
  };

  const carouselProducts = carouselMap[carouselFilter] ?? topRatedProducts;

  useEffect(() => {
    dispatch(getSearchedProduct(keyword, page));

    if (carouselFilter === "MostDownloaded") {
      dispatch(getMostDownloadedProductsAction());
    } else if (carouselFilter === "Newest") {
      dispatch(getYoungestProductsAction());
    } else if (carouselFilter === "Oldest") {
      dispatch(getOldestProductsAction());
    } else {
      dispatch(getTopRatedProductsAction());
    }
  }, [dispatch, keyword, page, carouselFilter]);

  return (
    <div className="browse-page">
      {loading ? (
        <Loader />
      ) : error || errorTopRated || errorMostDownloaded || errorYoungest || errorOldest ? (
        Alert("Unexpected error! Come back later! ")
      ) : (
        <>
          <div className="browse-hero">
            <div className="browse-hero-copy">
              <span className="eyebrow">Browse library</span>
              <h1>Find your next obsession</h1>
              <p>Discover top-rated games, trending favorites, and hidden gems across every genre.</p>
            </div>
            <div className="browse-hero-actions">
              {[
                { label: "Top rated", value: "TopRated" },
                { label: "Most downloaded", value: "MostDownloaded" },
                { label: "Newest", value: "Newest" },
                { label: "Oldest", value: "Oldest" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  className={carouselFilter === filter.value ? "browse-primary" : "browse-secondary"}
                  onClick={() => setCarouselFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="carousel-section">
            <div className="section-heading">
              <h2>{carouselFilter === "TopRated" ? "Top rated" : carouselFilter === "MostDownloaded" ? "Most downloaded" : carouselFilter === "Newest" ? "Newest" : "Oldest"}</h2>
              <span>Trending now</span>
            </div>
            <CarouselComponent topRatedProducts={carouselProducts.slice(0, 5)} />
          </div>

          <div className="browse-catalog">
            <div className="section-heading">
              <h2>All games</h2>
              <span>{browseGames.length} titles</span>
            </div>
            <Row className="g-4 browse-grid">
              {browseGames.map((product) => (
                <Col key={product?.id} sm={12} md={6} lg={4} xl={3}>
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
