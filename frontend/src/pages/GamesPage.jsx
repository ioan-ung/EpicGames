import React, { useEffect, useState } from "react";
import CarouselComponent from "../components/Carousel";
import { Alert, Col, Row, Dropdown } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchedProduct,
  getTopRatedProductsAction,
  getMostDownloadedProductsAction,
  getYoungestProductsAction,
  getCheapestProductsAction,
} from "../actions/productActions";
import Loader from "../components/Loader";

const filterLabels = {
  TopRated: 'Top',
  MostDownloaded: 'Popular',
  Newest: 'New',
  Cheap: 'Cheap',
};

const GamesPage = () => {
  const dispatch = useDispatch();
  const [carouselFilter, setCarouselFilter] = useState("TopRated");

  const getProducts = useSelector((state) => state.searchResults);
  const getTopRated = useSelector((state) => state.topRatedGames);
  const getMostDownloaded = useSelector((state) => state.mostDownloadedGames);
  const getYoungest = useSelector((state) => state.newestGames);
  const getCheapest = useSelector((state) => state.cheapestGames);
  const userDetails = useSelector((state) => state.currentUser.userDetails);

  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword") ?? "";
  const page = urlParams.get("page") ?? "1";

  const { error, loading, products, games } = getProducts;
  const { error: errorTopRated, games: topRatedProducts = [] } = getTopRated;
  const { error: errorMostDownloaded, games: mostDownloadedProducts = [] } = getMostDownloaded;
  const { error: errorYoungest, games: youngestProducts = [] } = getYoungest;
  const { error: errorCheapest, games: cheapestProducts = [] } = getCheapest;

  const excludeOwned = (list) =>
    list.filter((game) => !userDetails?.bought_games?.includes(game?.id));

  const browseGames = excludeOwned(products?.products ?? products ?? games?.products ?? games ?? []);

  const carouselMap = {
    TopRated: topRatedProducts,
    MostDownloaded: mostDownloadedProducts,
    Newest: youngestProducts,
    Cheap: cheapestProducts,
  };

  const carouselProducts = excludeOwned(carouselMap[carouselFilter] ?? topRatedProducts);

  useEffect(() => {
    dispatch(getSearchedProduct(keyword, page));

    if (carouselFilter === "MostDownloaded") {
      dispatch(getMostDownloadedProductsAction());
    } else if (carouselFilter === "Newest") {
      dispatch(getYoungestProductsAction());
    } else if (carouselFilter === "Cheap") {
      dispatch(getCheapestProductsAction());
    } else {
      dispatch(getTopRatedProductsAction());
    }
  }, [dispatch, keyword, page, carouselFilter]);

  return (
    <div className="browse-page">
      {loading ? (
        <Loader />
      ) : error || errorTopRated || errorMostDownloaded || errorYoungest || errorCheapest ? (
        <Alert variant="danger" className="browse-error">
          Unexpected error! Come back later!
        </Alert>
      ) : (
        <>
          <div className="browse-hero">
            <div className="browse-hero-copy">
              <span className="eyebrow">Browse library</span>
              <h1>Find your next obsession</h1>
              <p>Discover top-rated games, trending favorites, and hidden gems across every genre.</p>
            </div>
            <Dropdown className="browse-hero-actions">
              <Dropdown.Toggle className="browse-primary" id="browse-filter-dropdown">
                {filterLabels[carouselFilter]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {['TopRated', 'MostDownloaded', 'Newest', 'Cheap'].map((filter) => (
                  <Dropdown.Item
                    key={filter}
                    active={carouselFilter === filter}
                    onClick={() => setCarouselFilter(filter)}
                  >
                    {filterLabels[filter]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="carousel-section">
            <div className="section-heading">
              <h2>{filterLabels[carouselFilter]}</h2>
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
