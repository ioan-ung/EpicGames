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
import "./style/Store2.css";
import Download from "../svg/downloads.svg?react";
import Star from "../svg/star.svg?react";
import BuyGame from "./BuyGame";

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("TopRated");
  const [buyNow, setBuyNow] = useState(false);

  const getProducts = useSelector((state) => {
    if (activeFilter === "Newest") return state.newestGames;
    if (activeFilter === "Oldest") return state.oldestGames;
    if (activeFilter === "MostDownloaded") return state.mostDownloadedGames;
    return state.topRatedGames;
  });

  const userDetails = useSelector(store=>store.currentUser.userDetails);
  const { loading, error, games: allGames = [] } = getProducts;
  const games = allGames.filter((game) => !userDetails?.bought_games?.includes(game.id));
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
        <Alert variant="danger">
          Unexpected error! Come back later!
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
                  Learn More
                </Button>
                <Button
                  className="feature-secondary-btn"
                  onClick={() => setBuyNow(true)}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>

          <BuyGame
            price={selectedGame.price}
            id={selectedGame.id}
            buyNow={buyNow}
            setBuyNow={setBuyNow}
          />

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

export default Store;
