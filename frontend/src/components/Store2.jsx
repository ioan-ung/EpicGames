import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Alert, Container, Button } from "react-bootstrap";
import {
  getTopRatedProductsAction,
  getMostDownloadedProductsAction,
  getYoungestProductsAction,
  getOldestProductsAction,
} from "../actions/productActions";
import "./style/popup.css";
import Error from "./Error";
import "./style/Store2.css";
import Download from "../svg/downloads.svg?react";
import Star from "../svg/star.svg?react";

const Store2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("TopRated");

  const getProducts = useSelector((state) => {
    if (activeFilter === "Newest") return state.getYoungestProductsReducer;
    if (activeFilter === "Oldest") return state.getOldestProductsReducer;
    if (activeFilter === "MostDownloaded") return state.getMostDownloadedProductsReducer;
    return state.getTopRatedProductsReducer;
  });

  const { loading, error, games = [] } = getProducts;
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    if (activeFilter === "Newest") dispatch(getYoungestProductsAction());
    else if (activeFilter === "Oldest") dispatch(getOldestProductsAction());
    else if (activeFilter === "MostDownloaded") dispatch(getMostDownloadedProductsAction());
    else dispatch(getTopRatedProductsAction());
  }, [dispatch, activeFilter]);

  useEffect(() => {
    if (games.length > 0) {
      setSelectedGame((current) => 
        current && games.some((game) => game.id === current.id) ? current : games[0]
      );
    }
  }, [games]);

  return (
    <div className="discover-page">
      {loading || !selectedGame ? (
        <Loader />
      ) : error ? (
        <Alert variant={"danger"}>
          <Error />
        </Alert>
      ) : (
        <Container fluid className="discover-shell">
          <div className="discover-toolbar">
            <div>
              <span className="eyebrow">Discover</span>
              <h2>Featured titles</h2>
            </div>
            <div className="discover-filters">
              {['TopRated', 'Newest', 'Oldest', 'MostDownloaded'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'MostDownloaded' ? 'Most downloaded' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <img src={selectedGame.images?.[0]?.image} alt={selectedGame.name} className="feature-image" />
            <div className="feature-overlay" />
            <div className="feature-content">
              <span className="eyebrow">Editors' pick</span>
              <h1>{selectedGame.name}</h1>
              <div className="feature-meta">
                <span><Star /> {selectedGame.rating}</span>
                <span><Download /> {selectedGame.downloads}</span>
                <span>{selectedGame.age}+ age</span>
              </div>
              <p>{selectedGame.description}</p>
              <div className="feature-actions">
                <Button
                  className="feature-primary-btn"
                  onClick={() => navigate(`/gamePage/${selectedGame.id}/`)}
                >
                  Play now
                </Button>
                <Button className="feature-secondary-btn">Wishlist</Button>
              </div>
            </div>
          </div>

          <div className="discover-tray">
            {games.map((game) => (
              <button
                key={game.id}
                type="button"
                className={`discover-pick ${selectedGame.id === game.id ? 'active' : ''}`}
                onClick={() => setSelectedGame(game)}
              >
                <img src={game.images?.[0]?.image} alt={game.name} />
                <div className="discover-pick-copy">
                  <strong>{game.name}</strong>
                  <span>
                    {activeFilter === 'Newest' || activeFilter === 'Oldest' ? `${game.age}+` : activeFilter === 'MostDownloaded' ? `${game.downloads} downloads` : `${game.rating} rating`}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Store2;
