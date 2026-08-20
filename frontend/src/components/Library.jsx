import React, { useEffect, useMemo } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import Loader from "./Loader";
import { getSearchedProduct } from "../actions/productActions";
import LibraryIcon from "../svg/library.svg?react";

const Library = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCredentials = useSelector(state => state.currentUser);
  const { loading, error, userDetails } = userCredentials;
  const gameIds = userDetails?.bought_games ?? [];

  useEffect(() => {
    dispatch(getSearchedProduct("", 1));
  }, [dispatch]);

  const getProducts = useSelector((state) => state.searchResults);
  const { games: products, products: directProducts } = getProducts;
  const catalog = directProducts ?? products?.products ?? products ?? [];

  const ownedGames = useMemo(
    () => (Array.isArray(catalog) ? catalog.filter((game) => gameIds.includes(game.id)) : []),
    [catalog, gameIds]
  );

  return (
    <div className="discover-page">
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">
          Unexpected error! Come back later!
        </Alert>
      ) : (
        <div className="discover-shell">
          <div className="discover-toolbar">
            <div>
              <span className="eyebrow"><LibraryIcon /> My library</span>
              <h2>Your games</h2>
            </div>
            <div className="library-count">
              <strong>{ownedGames.length}</strong>
              <span>{ownedGames.length === 1 ? "title" : "titles"}</span>
            </div>
          </div>

          {ownedGames.length === 0 ? (
            <div className="library-empty">
              <LibraryIcon />
              <h2>Your library is empty</h2>
              <p>Games you buy will show up here, ready to launch whenever you are.</p>
              <Button className="browse-primary" onClick={() => navigate("/listGame/")}>
                Browse the store
              </Button>
            </div>
          ) : (
            <Row className="g-4 browse-grid">
              {ownedGames.map((game) => (
                <Col key={game.id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={game} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
